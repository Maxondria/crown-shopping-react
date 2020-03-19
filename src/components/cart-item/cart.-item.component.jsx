import React from "react";
import "./cart-item.styles.scss";

export default ({ item }) => {
  const { imageUrl, price, name, quantity } = item;
  return (
    <div className="cart-item">
      <img src={imageUrl} alt="item" />
      <div className="item-details">
        <div className="name">{name}</div>
        <div className="price">
          {quantity} x ${price}
        </div>
      </div>
    </div>
  );
};
