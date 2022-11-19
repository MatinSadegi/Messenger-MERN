import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignUpMutation } from "../../services/authApiSlice";
import { setProfile } from "../../redux/authSlice.js";
import { CropImage } from "../index";
const initialState = {
  firstName: "",
  lastName: "",
  avatar: null,
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const [form, setForm] = useState(initialState);
  const [openCrop, setOpenCrop] = useState(false);

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
  //choose image
  const handleImage = (e) => {
    const pics = e.target.files[0];
    const picsURL = URL.createObjectURL(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setForm({ ...form, avatar: picsURL });
    }
  };

  return (
    <>
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
        <label
          className="custom-file"
          onClick={() => setOpenCrop(true)}
          onChange={handleImage}
        >
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
      {!openCrop ? null : (
        <CropImage form={form} setForm={setForm} setOpenCrop={setOpenCrop} />
      )}
    </>
  );
};

export default Signup;
