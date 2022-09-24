import React, { useState } from 'react';
import { useSignInMutation } from '../../api/apiSlice';

const initialState = {
  email: '',
  password: '',
};

const Signin = () => {
  const [form, setForm] = useState(initialState);
  const [signIn] = useSignInMutation();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
   const handleSubmit = (e) => {
    e.preventDefault()
     signIn(form);
   };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        name='email'
        type='email'
        placeholder='Email'
        onChange={handleChange}
        required
      />

      <input
        name='password'
        type='password'
        placeholder='Password'
        onChange={handleChange}
        required
      />

      <button
        type='submit'
        className='auth__form-container_fields-content_button'
      >
        Sign In
      </button>
    </form>
  );
};

export default Signin;
