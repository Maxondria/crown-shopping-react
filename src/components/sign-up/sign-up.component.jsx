import React, { Component } from "react";
import "./sign-up.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDoc } from "../../firebase/firebase.utils";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      displayName: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, displayName, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords need to match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDoc(user, { displayName });
      this.setState(prevState => ({
        ...prevState,
        email: "",
        password: "",
        displayName: "",
        confirmPassword: ""
      }));
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
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            label="Full Name"
            type="text"
            name="displayName"
            value={this.state.displayName}
            handleChange={this.onChange}
            required
          />

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

          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            handleChange={this.onChange}
            value={this.state.confirmPassword}
            required
          />

          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}
