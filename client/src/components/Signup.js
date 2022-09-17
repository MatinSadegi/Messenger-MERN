import React, { useState } from 'react';

const initialState = {
  fullName: '',
  userName: '',
  password: '',
  confirmPassword: '',
};
const Signup = () => {
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  return (
    <form>
      <div>
        <input
          name='fullName'
          type='text'
          placeholder='Full Name'
          onChange={handleChange}
          required
        />
        <input
          name='userName'
          type='text'
          placeholder='Username'
          onChange={handleChange}
          required
        />
      </div>
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
