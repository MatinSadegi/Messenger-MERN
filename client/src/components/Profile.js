import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile } from "../redux/chatSlice";
import { motion } from "framer-motion";
import {
  showProfileVariants,
  profile,
  profileItems,
} from "../utils/variants";

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.chat.userProfile);
  const { show, info } = userInfo;
  return (
    <motion.div
      initial={false}
      animate={show ? "visible" : "hidden"}
      variants={showProfileVariants}
      className="profile"
    >
      <motion.div className="profile__container" variants={profile}>
        <motion.img
          variants={profileItems}
          src="https://img.icons8.com/material-rounded/20/000000/multiply--v1.png"
          alt="multiply"
          onClick={() => dispatch(setUserProfile({ info, show: false }))}
        />
        <motion.div variants={profileItems}>
          <img src={`${info && info.avatar.url}`} alt="avatar" />
          <p className="name">{`${info && info.firstName} ${
            info && info.lastName
          }`}</p>
          <p className="email">{info && info.email}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
