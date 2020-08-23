import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

import { Room, User } from './types/types';
import { languages, stages } from './utils/constants';

const { HttpsError } = functions.https;

export const ping = (request: functions.Request, response: functions.Response): void => {
  functions.logger.info('ping');
  response.sendStatus(200);
};

const getRoomsReference = (stage: string) => firebase.database().ref(`${stage}/rooms`);
const getRoomReference = (stage: string, id: string) => getRoomsReference(stage).child(id);

const internalErrorHandler = (err: Error) => {
  throw new HttpsError('internal', err.message);
};

const checkStage = (stage: string) => {
  if ((stages as readonly string[]).includes(stage)) return 0;
  throw new HttpsError('invalid-argument', 'Invalid Stage');
};

const getUid = (ctx: functions.https.CallableContext): string => {
  if (ctx.auth) return ctx.auth.uid;
  throw new HttpsError('unauthenticated', 'Unauthenticated User');
};

const getRoom = (stage: string, id: string) => getRoomReference(stage, id).once('value')
  .then((snap) => {
    const data = snap.val();
    if (data != null) return data;
    throw new HttpsError('not-found', 'Room Not Found');
  });

export const createRoom = (data: { stage: string }): Promise<{ roomId?: string }> => {
  checkStage(data.stage);

  const roomsRef = getRoomsReference(data.stage);
  const roomRef = roomsRef.push();
  const room :Room = {
    currentRound: {
      language: languages[0],
      problemURL: '',
      code: '',
    },
    users: {},
    state: 'waiting',
    history: [],
  };

  return roomRef.set(room).then(() => ({ roomId: roomRef.key ?? undefined }))
    .catch(internalErrorHandler);
};

export const enterRoom = (
  data: { stage: string, roomId: string, name: string },
  ctx: functions.https.CallableContext,
): Promise<Record<string, unknown>> => {
  checkStage(data.stage);
  const uid = getUid(ctx);

  return getRoom(data.stage, data.roomId)
    .then((room: Room) => {
      if (uid in room.users) throw new HttpsError('already-exists', 'Already Entered');
      if (Object.values(room.users).map((user: User) => user.name).includes(data.name)) throw new HttpsError('already-exists', 'Conflict Name');
      if (data.name.length < 1 || data.name.length > 20) throw new HttpsError('out-of-range', 'Invalid Name');

      const user = {
        name: data.name,
        points: 0,
        state: 'pending',
      };

      return getRoomReference(data.stage, data.roomId).child(`users/${uid}`).set(user);
    })
    .then(() => ({}))
    .catch(internalErrorHandler);
};

export const ready = async (
  data: { stage: string, roomId: string },
  ctx: functions.https.CallableContext,
): Promise<Record<string, unknown>> => {
  checkStage(data.stage);
  const uid = getUid(ctx);
  const room: Room | undefined = await getRoom(data.stage, data.roomId).catch(internalErrorHandler);
  if (room == null) internalErrorHandler(new Error('Room undefined'));

  if (!(uid in room.users)) throw new HttpsError('permission-denied', 'Invalid Request');
  if (room.state === 'playing') throw new HttpsError('failed-precondition', 'Playing Room');
  if (room.users[uid].state !== 'pending') throw new HttpsError('failed-precondition', 'Already Ready');

  return getRoomReference(data.stage, data.roomId).child(`users/${uid}/state`).set('ready')
    .then(() => getRoom(data.stage, data.roomId))
    .then(() => {
      if (Object.values(room.users).find((user: User) => user.state !== 'ready')) return {};

      const { history } = room;
      history.push(room.currentRound);

      return getRoomReference(data.stage, data.roomId).child('history').set(history);
    })
    .then(() => {
      const usersUid = Object.keys(room.users);
      const currentRound = {
        language: room.currentRound.language,
        problemURL: '',
        code: '',
        writer: usersUid[Math.floor(Math.random() * usersUid.length)],
      };

      return getRoomReference(data.stage, data.roomId).child('currentRound').set(currentRound);
    })
    .then(() => ({}))
    .catch(internalErrorHandler);
};

const WRITER_POINT = 2;
const WINNER_POINT = 2;

export const answer = async (
  data: { stage: string, roomId: string, answer: string },
  ctx: functions.https.CallableContext,
): Promise<{ correct: boolean }> => {
  checkStage(data.stage);
  const uid = getUid(ctx);
  const room: Room | undefined = await getRoom(data.stage, data.roomId).catch(internalErrorHandler);
  if (room == null) internalErrorHandler(new Error('Room undefined'));

  if (!(uid in room.users)) throw new HttpsError('permission-denied', 'Invalid Request');
  if (!(data.answer in room.users)) throw new HttpsError('invalid-argument', 'Invalid Answer');
  if (data.answer === uid) throw new HttpsError('invalid-argument', 'Self Answer');

  const { writer } = room.currentRound;
  const correct = data.answer === writer;
  const userlist = Object.values(room.users);
  const pendingCount = userlist.filter((user: User) => user.state === 'pending').length + 1;

  if (!correct && userlist.length > pendingCount) {
    return getRoomReference(data.stage, data.roomId).child(`users/${uid}/state`).set('pending')
      .then(() => ({ correct }));
  }
  const pendingUsers = Object.keys(room.users).reduce((acc, id: string) => {
    acc[id] = room.users[id];
    acc[id].state = 'pending';
    return acc;
  }, {} as { [id: string]: User });
  return getRoomReference(data.stage, data.roomId).child('users').set(pendingUsers)
    .then(() => getRoomReference(data.stage, data.roomId).child(`users/${writer}/points`).set(room.users[writer].points + WRITER_POINT))
    .then(() => {
      if (!correct) return Promise.resolve({ correct });
      return getRoomReference(data.stage, data.roomId).child('currentRound/winner').set(uid)
        .then(() => getRoomReference(data.stage, data.roomId).child(`users/${uid}/points`).set(room.users[uid].points + WINNER_POINT))
        .then(() => ({ correct }))
        .catch(internalErrorHandler);
    })
    .catch(internalErrorHandler);
};
