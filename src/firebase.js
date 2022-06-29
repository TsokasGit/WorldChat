import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "yourapikey",
  authDomain: "worldchat-e09fc.firebaseapp.com",
  projectId: "worldchat-e09fc",
  storageBucket: "worldchat-e09fc.appspot.com",
  messagingSenderId: "405894718715",
  appId: "1:405894718715:web:3219354070e4fd32e63c5e",
  measurementId: "G-EZS9WXXLNH"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()
export {db, auth}