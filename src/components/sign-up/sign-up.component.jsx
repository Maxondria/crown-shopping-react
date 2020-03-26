import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import "./sign-up.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signUpStart } from "../../redux/reducers//user/user.actions";

const SignUp = ({ signUpStart }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    displayName: "",
    confirmPassword: ""
  });

  const { email, displayName, password, confirmPassword } = credentials;

  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords need to match");
      return;
    }
    signUpStart({ email, displayName, password });
  };

  const onChange = ({ target: { name, value } }) => {
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          label="Full Name"
          type="text"
          name="displayName"
          value={credentials.displayName}
          handleChange={onChange}
          required
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={credentials.email}
          handleChange={onChange}
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          handleChange={onChange}
          value={credentials.password}
          required
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          handleChange={onChange}
          value={credentials.confirmPassword}
          required
        />

        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = { signUpStart };

const withConnect = connect(undefined, mapDispatchToProps);

export default compose(withConnect)(SignUp);
