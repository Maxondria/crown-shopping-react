import React from "react";
import { connect } from "react-redux";
import {
  addItem,
  clearItemFromCart,
  removeItem
} from "../../redux/reducers/cart/cart.actions";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ item, addItem, clearItemFromCart, removeItem }) => {
  const { name, price, quantity, imageUrl } = item;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(item)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(item)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => clearItemFromCart(item)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = { addItem, clearItemFromCart, removeItem };

export default connect(undefined, mapDispatchToProps)(CheckoutItem);
