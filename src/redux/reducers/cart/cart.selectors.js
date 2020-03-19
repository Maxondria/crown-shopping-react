import { createSelector } from "reselect";

const selectCart = ({ cart }) => cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accCartItemsQty, currentItemQty) =>
        accCartItemsQty + currentItemQty.quantity,
      0
    )
);
