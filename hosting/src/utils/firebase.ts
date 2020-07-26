import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCNX-gSO5ps8nrUD_e7N717q8OeLD_9W4A",
    authDomain: "code-jinro.firebaseapp.com",
    databaseURL: "https://code-jinro.firebaseio.com",
    projectId: "code-jinro",
    storageBucket: "code-jinro.appspot.com",
    messagingSenderId: "448963175445",
    appId: "1:448963175445:web:db20cc6214f8952f519a1c",
    measurementId: "G-1T2EFWLW9C"
  };

// Initialize Firebase
const firebaseClient = firebase.initializeApp(firebaseConfig);

export const firestore = firebaseClient.firestore();
export const auth = firebaseClient.auth();

