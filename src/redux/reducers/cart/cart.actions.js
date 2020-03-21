import {
  TOGGLE_CART_HIDDEN,
  ADD_ITEM,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM
} from "../../constants/actionTypes";

export const toggleCartHidden = () => ({
  type: TOGGLE_CART_HIDDEN
});

export const addItem = cartItem => ({
  type: ADD_ITEM,
  payload: { cartItem }
});

export const removeItem = cartItem => ({
  type: REMOVE_ITEM,
  payload: { cartItem }
});

export const clearItemFromCart = cartItem => ({
  type: CLEAR_ITEM_FROM_CART,
  payload: { cartItem }
});
