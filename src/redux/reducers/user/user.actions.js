import { SET_CURRENT_USER } from "../../constants/actionTypes";

export const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  payload: { currentUser }
});
