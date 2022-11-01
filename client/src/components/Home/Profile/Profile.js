import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  showProfileVariants,
  profile,
  profileItems,
} from "../../../assets/FramerMotionVariants/variants";

const Profile = ({ showProfile, setShowProfile }) => {
  const userInfo = useSelector((state) => state.auth.user.user);
  console.log(userInfo);

  return (
    <motion.div
      initial={false}
      animate={showProfile ? "visible" : "hidden"}
      variants={showProfileVariants}
      className="profile"
    >
      <motion.div className="profile__container" variants={profile}>
        <motion.img
          variants={profileItems}
          src="https://img.icons8.com/material-rounded/20/000000/multiply--v1.png"
          alt="multiply"
          onClick={() => setShowProfile(false)}
        />
        <motion.div variants={profileItems}>
          <img
            src={`${userInfo.avatar.url}`}
          />
          <p className="name">{`${userInfo.firstName} ${userInfo.lastName}`}</p>
          <p className="email">{userInfo.email}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
