import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import crypto from 'crypto';

const generateRandomString = (len: number = 32) => crypto.randomBytes(len).toString('base64').substring(0, len);

export const createUserSecret = (user: UserRecord) => {
  firebase.database().ref(`secrets/${user.uid}`).set(generateRandomString());
};

export const deleteUserSecret = (user: UserRecord) => {
  firebase.database().ref(`secrets/${user.uid}`).remove();
};
