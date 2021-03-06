import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  auth,
  createUserProfileDoc,
  getCurrentUser,
  googleProvider
} from "../../../firebase/firebase.utils";
import {
  CHECK_USER_SESSION,
  EMAIL_SIGN_IN_START,
  GOOGLE_SIGN_IN_START,
  SIGN_OUT_START,
  SIGN_UP_START,
  SIGN_UP_SUCCESS
} from "../../constants/actionTypes";
import {
  SignInFailure,
  SignInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess
} from "../../reducers/user/user.actions";

const getSnapShotFromAutherUserWorkerSaga = function*(
  authedUser,
  additionalData = {}
) {
  try {
    const userRef = yield call(
      createUserProfileDoc,
      authedUser,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(
      SignInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data()
      })
    );
  } catch (error) {
    yield put(SignInFailure(error));
  }
};

const onGoogleSignStartWorkerSaga = function*() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapShotFromAutherUserWorkerSaga(user);
  } catch (error) {
    yield put(SignInFailure(error));
  }
};

const onGoogleSignStartSaga = function*() {
  yield takeLatest(GOOGLE_SIGN_IN_START, onGoogleSignStartWorkerSaga);
};

const onEmailSignInStartWorkerSaga = function*({
  payload: { email, password }
}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapShotFromAutherUserWorkerSaga(user);
  } catch (error) {
    yield put(SignInFailure(error));
  }
};

const onEmailSignInStartSaga = function*() {
  yield takeLatest(EMAIL_SIGN_IN_START, onEmailSignInStartWorkerSaga);
};

const onCheckUserSessionWorkerSaga = function*() {
  try {
    const user = yield getCurrentUser();
    if (!user) return;
    yield getSnapShotFromAutherUserWorkerSaga(user);
  } catch (error) {
    yield put(SignInFailure(error));
  }
};

const onCheckUserSessionSaga = function*() {
  yield takeLatest(CHECK_USER_SESSION, onCheckUserSessionWorkerSaga);
};

const onSignOutStartWorkerSaga = function*() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
};

const onSignOutStartSaga = function*() {
  yield takeLatest(SIGN_OUT_START, onSignOutStartWorkerSaga);
};

const onSignUpStartWorkerSaga = function*({
  payload: { displayName, email, password }
}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
};

const onSignUpStartSaga = function*() {
  yield takeLatest(SIGN_UP_START, onSignUpStartWorkerSaga);
};

const onSignUpSuccessWorkerSaga = function*({
  payload: { user, additionalData }
}) {
  yield getSnapShotFromAutherUserWorkerSaga(user, additionalData);
};

const onSignUpSuccessSaga = function*() {
  yield takeLatest(SIGN_UP_SUCCESS, onSignUpSuccessWorkerSaga);
};

export function* userSagas() {
  yield all([
    call(onGoogleSignStartSaga),
    call(onEmailSignInStartSaga),
    call(onCheckUserSessionSaga),
    call(onSignOutStartSaga),
    call(onSignUpStartSaga),
    call(onSignUpSuccessSaga)
  ]);
}
