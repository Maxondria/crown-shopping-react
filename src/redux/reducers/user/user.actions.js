import {
  GOOGLE_SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  EMAIL_SIGN_IN_START,
  CHECK_USER_SESSION,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "../../constants/actionTypes";

export const googleSignInStart = () => ({
  type: GOOGLE_SIGN_IN_START
});

export const emailSignInStart = ({ email, password }) => ({
  type: EMAIL_SIGN_IN_START,
  payload: { email, password }
});

export const SignInSuccess = currentUser => ({
  type: SIGN_IN_SUCCESS,
  payload: { currentUser }
});

export const SignInFailure = error => ({
  type: SIGN_IN_FAILURE,
  payload: { error }
});

export const checkUserSession = () => ({
  type: CHECK_USER_SESSION
});

export const signOutStart = () => ({
  type: SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
  type: SIGN_OUT_FAILURE,
  payload: { error }
});

export const signUpStart = ({ email, displayName, password }) => ({
  type: SIGN_UP_START,
  payload: { email, displayName, password }
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: SIGN_UP_SUCCESS,
  payload: { user, additionalData }
});

export const signUpFailure = error => ({
  type: SIGN_UP_FAILURE,
  payload: { error }
});
