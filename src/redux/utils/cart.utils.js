const itemExists = (cartItems, itemToFind) =>
  cartItems.find(({ id }) => id === itemToFind.id);

export const addItemToCart = (cartItems, cartItemToAdd) => {
  const item = itemExists(cartItems, cartItemToAdd);

  if (item) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const item = itemExists(cartItems, cartItemToRemove);

  if (item.quantity === 1) {
    return cartItems.filter(({ id }) => id !== cartItemToRemove.id);
  }
  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
