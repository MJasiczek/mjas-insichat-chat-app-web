import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx"
  };

const firebase_app = firebase.initializeApp(firebaseConfig);
const firebase_db = firebase_app.firestore();
const firebase_auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {provider, firebase_auth};

export default firebase_db;

//xxx - firebase info