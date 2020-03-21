import { createSelector } from "reselect";

const selectCart = ({ cart }) => cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
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

export const selectCartTotal = createSelector([selectCartItems], cartItems =>
  cartItems.reduce(
    (accCartTotal, currentItem) =>
      accCartTotal + currentItem.quantity * currentItem.price,
    0
  )
);
