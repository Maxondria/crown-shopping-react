import { TOGGLE_CART_HIDDEN, ADD_ITEM } from "../../constants/actionTypes";

export const toggleCartHidden = () => ({
  type: TOGGLE_CART_HIDDEN
});

export const addItem = cartItem => ({
  type: ADD_ITEM,
  payload: { cartItem }
});
