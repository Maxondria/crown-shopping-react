import {
  FETCH_COLLECTIONS_START,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE
} from "../../constants/actionTypes";
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collections => ({
  type: FETCH_COLLECTIONS_SUCCESS,
  payload: { collections }
});

export const fetchCollectionsFailure = errorMessage => ({
  type: FETCH_COLLECTIONS_FAILURE,
  payload: { errorMessage }
});

export const fetchCollectionsStartAsync = () => async dispatch => {
  try {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionsStart());
    const snapshot = await collectionRef.get();
    const collections = convertCollectionsSnapshotToMap(snapshot);
    dispatch(fetchCollectionsSuccess(collections));
  } catch (error) {
    dispatch(fetchCollectionsFailure(error.message));
  }
};
