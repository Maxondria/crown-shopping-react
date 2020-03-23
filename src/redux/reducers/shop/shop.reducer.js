import { createReducer } from "../../utils/reducer.utils";
import { initialState } from "../../store/state/initial.state";
import {
  FETCH_COLLECTIONS_START,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE
} from "../../constants/actionTypes";

export const shopReducer = createReducer(initialState.shop, {
  [FETCH_COLLECTIONS_START]: (state, _payload) => ({
    ...state,
    isFetching: true
  }),
  [FETCH_COLLECTIONS_SUCCESS]: (state, { collections }) => ({
    ...state,
    isFetching: false,
    collections
  }),
  [FETCH_COLLECTIONS_FAILURE]: (state, { errorMessage }) => ({
    ...state,
    isFetching: false,
    errorMessage
  })
});
