import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignInMutation } from "../../services/authApiSlice";
import { setProfile } from "../../redux/authSlice.js";

const initialState = {
  email: "",
  password: "",
};

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [signIn] = useSignInMutation();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn(form).unwrap();
      dispatch(setProfile(result));
      navigate("/");
    } catch (error) {
      const { errors } = error.data;
      toast.error(errors, {
        autoClose: 4000,
        position: "bottom-left",
        theme: "colored",
        pauseOnHover: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="auth__form-container_fields-content_button"
      >
        Sign In
      </button>
    </form>
  );
};

export default Signin;
