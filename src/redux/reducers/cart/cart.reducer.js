import { createReducer } from "../../utils/reducer.utils";
import { initialState } from "../../store/state/initial.state";
import {
  TOGGLE_CART_HIDDEN,
  ADD_ITEM,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM,
  CLEAR_CART
} from "../../constants/actionTypes";
import { addItemToCart, removeItemFromCart } from "../../utils/cart.utils";

export const cartReducer = createReducer(initialState.cart, {
  [TOGGLE_CART_HIDDEN]: (state, _payload) => ({
    ...state,
    hidden: !state.hidden
  }),
  [ADD_ITEM]: (state, { cartItem }) => ({
    ...state,
    cartItems: addItemToCart(state.cartItems, cartItem)
  }),
  [REMOVE_ITEM]: (state, { cartItem }) => ({
    ...state,
    cartItems: removeItemFromCart(state.cartItems, cartItem)
  }),
  [CLEAR_ITEM_FROM_CART]: (state, { cartItem }) => ({
    ...state,
    cartItems: state.cartItems.filter(item => item.id !== cartItem.id)
  }),
  [CLEAR_CART]: (state, _payload) => ({
    ...state,
    cartItems: [],
    hidden: true
  })
});
