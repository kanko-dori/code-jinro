import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

import { Room, RoundState } from './types/types';
import { languages } from './utils/constants';

export const ping = (request: functions.Request, response: functions.Response) => {
  functions.logger.info('ping');
  response.sendStatus(200);
};

export const createNewRoom = (request: functions.Request, response: functions.Response) => {
  const { stage } = request.params;
  if (!['production', 'staging', 'development'].includes(stage)) {
    response.status(400).send('Stage is required');
    return;
  }

  const realtimeDB = firebase.database();
  const roomsRef = realtimeDB.ref(`${stage}/room`);
  const newRoomRef = roomsRef.push();
  const newRoom :Room = {
    currentRound: {
      language: languages[0],
      problemURL: '',
      code: '',
    },
    users: [],
    currentState: RoundState.問題提示,
    history: [],
  };

  newRoomRef.set(newRoom).then((room) => {
    console.log(room);
    response.send({ room: newRoom, id: newRoomRef.key });
  }).catch((err) => {
    response.sendStatus(500).send(err);
  });
};
