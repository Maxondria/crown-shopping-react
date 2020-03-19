import { createReducer } from "../../utils/reducer.utils";
import { initialState } from "../../store/state/initial.state";
import { SET_CURRENT_USER } from "../../constants/actionTypes";

export const userReducer = createReducer(initialState.user, {
  [SET_CURRENT_USER]: (state, { currentUser }) => ({ ...state, currentUser })
});
