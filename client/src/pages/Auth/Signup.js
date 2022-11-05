import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignUpMutation } from "../../services/authApiSlice";
import { setProfile } from "../../redux/authSlice.js";

const initialState = {
  firstName: "",
  lastName: "",
  avatar: {},
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
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
      navigate("/");
    } catch (err) {
      const { errors } = err.data;
      toast.error(errors, {
        autoClose: 4000,
        position: "bottom-left",
        theme: "colored",
        pauseOnHover: false,
      });
    }
  };
  //handle and convert it in base64
  const handleImage = (e) => {
    const pics = e.target.files[0];
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FileReader();
      data.readAsDataURL(pics);
      data.onloadend = () => {
        setForm({ ...form, avatar: data.result });
      };
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
      </div>
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
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        required
      />
      <label className="custom-file" onChange={handleImage}>
        <input name="avatar" type="file" />
        Upload Profile Image
      </label>
      <button
        type="submit"
        className="auth__form-container_fields-content_button"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
