import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import "./App.css";
import Header from "./components/header/header.component";
import { auth, createUserProfileDoc } from "./firebase/firebase.utils";
import CheckoutPage from "./pages/checkout/checkout.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { setCurrentUser } from "./redux/reducers/user/user.actions";
import { selectCurrentUser } from "./redux/reducers/user/user.selectors";

class App extends Component {
  unSubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async currentUser => {
      if (currentUser) {
        const userRef = await createUserProfileDoc(currentUser);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
      } else setCurrentUser(currentUser); //null
    });
  }

  componentWillUnmount() {
    //firebase.Unsubscribe()
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={routeProps =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInSignUp {...routeProps} />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = { setCurrentUser };

export default connect(mapStateToProps, mapDispatchToProps)(App);
