import { createReducer } from "../../utils/reducer.utils";
import { initialState } from "../../store/state/initial.state";
import { TOGGLE_CART_HIDDEN } from "../../constants/actionTypes";

export const cartReducer = createReducer(initialState.cart, {
  [TOGGLE_CART_HIDDEN]: (state, _payload) => ({
    ...state,
    hidden: !state.hidden
  })
});
