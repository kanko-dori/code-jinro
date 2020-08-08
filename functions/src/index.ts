import * as functions from 'firebase-functions';
import {Room, RoundState} from './types/types'
import {languages} from './utils/constants'
// Import Admin SDK
// import * as admin from 'firebase-admin'

// // Attach an asynchronous callback to read the data at our posts reference
// ref.on("value", function(snapshot) {
//   console.log(snapshot.val());
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const createNewRoom = functions.https.onRequest((request: functions.Request, response: functions.Response) => {
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
      console.log({ newRoom });

    response.send(newRoom);
});
