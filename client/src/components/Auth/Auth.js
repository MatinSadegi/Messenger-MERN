import React, { useState } from 'react';
import { Signin, Signup } from '..';

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
    };
  return (
    <div className='auth'>
      <div className='auth__form-container'>
        <div className='auth__form-container_fields'>
          <p>START FOR FREE</p>
          <h2>{isSignup ? 'Create new account' : 'Sign In'}</h2>
          <p>
            {isSignup
              ? 'Already have an account ?'
              : " Don't have an account ?"}
            <span onClick={switchMode}>{isSignup ? 'Sign In' : 'Sign Up'}</span>
          </p>
          {isSignup ? <Signup /> : <Signin />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
