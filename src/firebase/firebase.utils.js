import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDGxWgqHs2zzTmSnRWPgbfGh1UOKUpXE4o",
  authDomain: "crown-max-db.firebaseapp.com",
  databaseURL: "https://crown-max-db.firebaseio.com",
  projectId: "crown-max-db",
  storageBucket: "crown-max-db.appspot.com",
  messagingSenderId: "4310596652",
  appId: "1:4310596652:web:fd60e836dfbee5c21b2589"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export { firebase as default };
