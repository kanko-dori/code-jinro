import * as functions from 'firebase-functions';
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
    // Get a database reference to our posts
    const uid = generateRandomID(10);
    // reques
    functions.logger.info(uid, { structuredData: true });
    response.send(uid);
});


const generateRandomID = (length: number) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
