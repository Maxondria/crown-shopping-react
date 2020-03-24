import { takeLatest, call, put, all } from "redux-saga/effects";
import { FETCH_COLLECTIONS_START } from "../../constants/actionTypes";
import {
  convertCollectionsSnapshotToMap,
  firestore
} from "../../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from "../../reducers/shop/shop.actions";

const fetchCollectionsStartWorkerSaga = function*() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collections = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collections));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
};

const fetchCollectionsStartSaga = function*() {
  yield takeLatest(FETCH_COLLECTIONS_START, fetchCollectionsStartWorkerSaga);
};

export function* shopSagas() {
  yield all([call(fetchCollectionsStartSaga)]);
}
