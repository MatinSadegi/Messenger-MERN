import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../features/auth/authApiSlice';
import { setProfile } from '../../features/auth/authSlice.js';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Signup = ({ setErr }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [signUp] = useSignUpMutation();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signUp(form).unwrap();
      dispatch(setProfile(result));
      navigate('/');
    } catch (error) {
      const { errors } = error.data;
      setErr(errors);
    }
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
