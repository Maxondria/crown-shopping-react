import { createReducer } from "../../utils/reducer.utils";
import { initialState } from "../../store/state/initial.state";
import { TOGGLE_CART_HIDDEN, ADD_ITEM } from "../../constants/actionTypes";
import { addItemToCart } from "../../utils/cart.utils";

export const cartReducer = createReducer(initialState.cart, {
  [TOGGLE_CART_HIDDEN]: (state, _payload) => ({
    ...state,
    hidden: !state.hidden
  }),
  [ADD_ITEM]: (state, { cartItem }) => ({
    ...state,
    cartItems: addItemToCart(state.cartItems, cartItem)
  })
});
