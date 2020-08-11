import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import { NextFunction } from 'express';

import { Room } from './types/types';
import { languages, stages } from './utils/constants';

export const stageChecker = (
  req: functions.Request,
  res: functions.Response,
  next: NextFunction,
): void => {
  if (!(stages as readonly string[]).includes(req.params.stage)) {
    res.status(400).send('Invalid Stage');
  } else {
    next();
  }
};

export const ping = (request: functions.Request, response: functions.Response): void => {
  functions.logger.info('ping');
  response.sendStatus(200);
};

export const createNewRoom = (request: functions.Request, response: functions.Response):void => {
  try {
    const { stage } = request.params;
    if (!['production', 'staging', 'development'].includes(stage)) {
      response.status(400).send('Invalid Stage');
      return;
    }

    const realtimeDB = firebase.database();
    const roomsRef = realtimeDB.ref(`${stage}/rooms`);
    const newRoomRef = roomsRef.push();
    const newRoom :Room = {
      currentRound: {
        language: languages[0],
        problemURL: '',
        code: '',
      },
      users: {},
      state: 'waiting',
      history: [],
    };

    newRoomRef.set(newRoom).then((room) => {
      console.log(room);
      response.status(201).send({ id: newRoomRef.key });
    });
  } catch (err) {
    response.sendStatus(500).send(err);
  }
};
