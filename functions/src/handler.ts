import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

import { Room } from './types/types';
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

export const createRoom = (data: any, context: functions.https.CallableContext) => {
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

  return roomRef.set(room).then((room) => {
    console.log(room);
    return { roomId: roomRef.key };
  }).catch((err: Error) => {
    throw new functions.https.HttpsError('internal', err.message);
  });
};
