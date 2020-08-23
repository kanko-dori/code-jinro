import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

import { Room, User } from './types/types';
import { languages, stages } from './utils/constants';

export const ping = (request: functions.Request, response: functions.Response): void => {
  functions.logger.info('ping');
  response.sendStatus(200);
};

const getRoomsReference = (stage: string) => firebase.database().ref(`${stage}/rooms`);
const getRoomReference = (stage: string, id: string) => getRoomsReference(stage).child(id);

const checkStage = (stage: string) => {
  if ((stages as readonly string[]).includes(stage)) return 0;
  throw new functions.https.HttpsError('invalid-argument', 'Invalid Stage');
};

const checkRoomId = (stage: string, id: string) => getRoomReference(stage, id).once('value')
  .then((snap) => {
    const data = snap.val();
    if (data != null) return data;
    throw new functions.https.HttpsError('not-found', 'Room Not Found');
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
    .catch((err: Error) => {
      throw new functions.https.HttpsError('internal', err.message);
    });
};

export const enterRoom = (
  data: { stage: string, roomId: string, name: string },
  ctx: functions.https.CallableContext,
): Promise<Record<string, unknown>> => {
  checkStage(data.stage);

  return checkRoomId(data.stage, data.roomId)
    .then((room: Room) => {
      if (!ctx.auth) throw new functions.https.HttpsError('unauthenticated', 'Unauthenticated User');
      if (ctx.auth.uid in room.users) throw new functions.https.HttpsError('already-exists', 'Already Entered');
      if (Object.values(room.users).map((user: User) => user.name).includes(data.name)) throw new functions.https.HttpsError('already-exists', 'Conflict Name');
      if (data.name.length < 1 || data.name.length > 20) throw new functions.https.HttpsError('out-of-range', 'Invalid Name');

      const user = {
        name: data.name,
        points: 0,
        state: 'pending',
      };

      return getRoomReference(data.stage, data.roomId).child(`users/${ctx.auth.uid}`).set(user);
    })
    .then(() => ({}))
    .catch((err: Error) => {
      throw new functions.https.HttpsError('internal', err.message);
    });
};
