import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import {
  googleSignInStart,
  emailSignInStart
} from "../../redux/reducers/user/user.actions";
import "./sign-in.styles.scss";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async event => {
    event.preventDefault();
    emailSignInStart({ ...credentials });
  };

  const onChange = ({ target: { name, value } }) => {
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2 className="title">I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
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

        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = { googleSignInStart, emailSignInStart };

const withConnect = connect(undefined, mapDispatchToProps);

export default compose(withConnect)(SignIn);
