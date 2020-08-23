import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

import * as express from 'express';
import * as cors from 'cors';
import * as handler from './handler';
import * as onAuth from './auth';

const app = express();
app.use(cors({}));
firebase.initializeApp();

app.get('/', handler.ping);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.api = functions.https.onRequest(app);

exports.authCreate = functions.auth.user().onCreate(onAuth.createUserSecret);
exports.authDelete = functions.auth.user().onDelete(onAuth.deleteUserSecret);
