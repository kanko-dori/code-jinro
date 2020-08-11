import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

import { Room } from './types/types';
import { languages, stages } from './utils/constants';

export const stageChecker = (req: Request, res: Response, next: NextFunction): void => {
  if (!(stages as readonly string[]).includes(req.params.stage)) {
    res.status(400).send('Invalid Stage');
  } else {
    next();
  }
};

export const ping = (request: Request, response: Response): void => {
  functions.logger.info('ping');
  response.sendStatus(200);
};

export const createNewRoom = (request: Request, response: Response, next: NextFunction) :void => {
  try {
    const { stage } = request.params;

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
    next(err);
  }
};
