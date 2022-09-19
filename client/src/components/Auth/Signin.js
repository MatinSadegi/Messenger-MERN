import React, { useState } from 'react';

const initialState = {
  userName: '',
  password: '',
};

const Signin = () => {
  const [form, setForm] = useState(initialState);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <input
        name='username'
        type='text'
        placeholder='Username'
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
