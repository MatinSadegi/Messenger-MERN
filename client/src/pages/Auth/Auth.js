import React, { useState } from "react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Signin, Signup } from "..";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };
  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__fields">
          <p className="auth__title">START FOR FREE</p>
          <h2 className="auth__type">{isSignup ? "Create new account" : "Sign In"}</h2>
          <p className="auth__status">
            {isSignup
              ? "Already have an account ?"
              : " Don't have an account ?"}
            <span onClick={switchMode}>{isSignup ? "Sign In" : "Sign Up"}</span>
          </p>
          {isSignup ? <Signup /> : <Signin />}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
