import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvh66LPJa3NhQz3D8WfhP6UaHyg2OoFyw",
  authDomain: "bantu-chat-application.firebaseapp.com",
  projectId: "bantu-chat-application",
  storageBucket: "bantu-chat-application.appspot.com",
  messagingSenderId: "893428380801",
  appId: "1:893428380801:web:af0b2103c8af7aec3e0980",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };