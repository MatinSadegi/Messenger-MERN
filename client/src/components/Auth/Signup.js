import React, { useState } from 'react';
import { useSignUpMutation } from '../../api/apiSlice';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Signup = () => {
  const [form, setForm] = useState(initialState);
  const [signUp] = useSignUpMutation();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(form);
  };
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <input
          name='firstName'
          type='text'
          placeholder='First Name'
          onChange={handleChange}
          required
        />
        <input
          name='lastName'
          type='text'
          placeholder='Last Name'
          onChange={handleChange}
          required
        />
      </div>
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
      <input
        name='confirmPassword'
        type='password'
        placeholder='Confirm Password'
        onChange={handleChange}
        required
      />

      <button
        type='submit'
        className='auth__form-container_fields-content_button'
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
