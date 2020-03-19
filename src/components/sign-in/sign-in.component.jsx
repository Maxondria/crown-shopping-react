import React, { Component } from "react";
import { auth, SignInWithGoogle } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState(prevState => ({ ...prevState, email: "", password: "" }));
    } catch (error) {
      console.error(error);
    }
  };

  onChange = ({ target: { name, value } }) => {
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  render() {
    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={this.state.email}
            handleChange={this.onChange}
            required
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            handleChange={this.onChange}
            value={this.state.password}
            required
          />

          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton onClick={SignInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
