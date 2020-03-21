import React from "react";
import { connect } from "react-redux";
import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart.-item.component";
import CustomButton from "../custom-button/custom-button.component";
import { selectCartItems } from "../../redux/reducers/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/reducers/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

const CartDropdown = ({ cartItems, toggleCartHidden, history }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} item={item} />)
        ) : (
          <span className="empty-message">No Items In Cart!</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          toggleCartHidden();
          return history.push("/checkout");
        }}
      >
        Go to checkout
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

const mapDispatchToProps = { toggleCartHidden };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
);
