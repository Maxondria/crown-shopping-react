import { createReducer } from "../../utils/reducer.utils";
import { initialState } from "../../store/state/initial.state";
import { UPDATE_COLLECTIONS } from "../../constants/actionTypes";

export const shopReducer = createReducer(initialState.shop, {
  [UPDATE_COLLECTIONS]: (state, { collections }) => ({ ...state, collections })
});
