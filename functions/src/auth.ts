import * as firebase from 'firebase-admin';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import * as crypto from 'crypto';

const generateRandomString = (len = 32) => crypto.randomBytes(len).toString('base64').substring(0, len);

export const createUserSecret = (user: UserRecord): void => {
  firebase.database().ref(`secrets/${user.uid}`).set(generateRandomString());
};

export const deleteUserSecret = (user: UserRecord): void => {
  firebase.database().ref(`secrets/${user.uid}`).remove();
};
