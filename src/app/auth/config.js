import firebase from 'firebase';
// https://console.firebase.google.com/
// Click "Add to web app"
// Copy + paste config

var config = {
    apiKey: "AIzaSyBWOoFp6MBky95HaC-WvsxSMyc0m8a1f6k",
    authDomain: "arsenic-374f3.firebaseapp.com",
    databaseURL: "https://arsenic-374f3.firebaseio.com",
    projectId: "arsenic-374f3",
    storageBucket: "arsenic-374f3.appspot.com",
    messagingSenderId: "1019223436905"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const auth = firebase.auth
export const google = new firebase.auth.GoogleAuthProvider();