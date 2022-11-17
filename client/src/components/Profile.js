import React from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile } from "../redux/chatSlice";
import { showProfileVariants, profile, profileItems } from "../utils/variants";

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.chat.userProfile);
  const { show, info } = userInfo;
  return (
    <motion.div
      initial={false}
      animate={show ? "visible" : "hidden"}
      variants={showProfileVariants}
      className="signed-user"
    >
      <motion.div className="signed-user__profile" variants={profile}>
        <motion.img
          variants={profileItems}
          src="https://img.icons8.com/material-rounded/20/000000/multiply--v1.png"
          alt="multiply"
          onClick={() => dispatch(setUserProfile({ info, show: false }))}
        />
        <motion.div variants={profileItems} className="signed-user__info">
          <img
            src={`${info && info.avatar.url}`}
            alt="avatar"
            className="signed-user__avatar"
          />
          <p className="signed-user__name">{`${info && info.firstName} ${
            info && info.lastName
          }`}</p>
          <p className="signed-user__email">{info && info.email}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
