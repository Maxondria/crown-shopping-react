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

export const createUserProfileDoc = async (authedUser, additionalData = {}) => {
  if (!authedUser) return;
  const userRef = firestore.doc(`users/${authedUser.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = authedUser;
    const createdAt = new Date();
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = snapShot => {
  const transformedCollection = snapShot.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      id: doc.id,
      title,
      routeName: encodeURI(title.toLowerCase()),
      items
    };
  });
  return transformedCollection.reduce((accumulator, currentCollection) => {
    accumulator[currentCollection.title.toLowerCase()] = currentCollection;
    return accumulator;
  }, {});
};

export { firebase as default };
