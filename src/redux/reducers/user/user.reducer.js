import { createReducer } from "../../utils/reducer.utils";
import { initialState } from "../../store/state/initial.state";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE
} from "../../constants/actionTypes";

export const userReducer = createReducer(initialState.user, {
  [SIGN_IN_SUCCESS]: (state, { currentUser }) => ({
    ...state,
    error: null,
    currentUser
  }),
  [SIGN_IN_FAILURE]: (state, { error }) => ({
    ...state,
    error
  }),
  [SIGN_OUT_SUCCESS]: (state, _payload) => ({
    ...state,
    currentUser: null
  }),
  [SIGN_OUT_FAILURE]: (state, { error }) => ({
    ...state,
    error
  })
});
