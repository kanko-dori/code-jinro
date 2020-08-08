import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

import * as express from 'express';
import * as cors from 'cors';
import * as handler from './handler'

const app = express();
app.use(cors({}));
firebase.initializeApp();

app.get('/', handler.ping);

app.post('/:stage/room', handler.createNewRoom);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.api = functions.https.onRequest(app);
