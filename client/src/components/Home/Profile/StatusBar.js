import React, { useState } from "react";
import { motion } from "framer-motion";
import {Profile} from '../../index'
import { showItemsVariants } from "../../../assets/FramerMotionVariants/variants.js";

const StatusBar = () => {
  const [showItems, setShowItems] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  return (
    <div className="status-bar__container">
      <div className="status-bar__top">
        <div
          className="profile-img"
          onClick={() => setShowItems(!showItems)}
        ></div>
        <motion.div
          className="items"
          initial={false}
          animate={showItems ? "open" : "close"}
          variants={showItemsVariants}
        >
          <motion.p
            variants={showItemsVariants}
            onClick={() => setShowProfile(true)}
          >
            Edit Profile
          </motion.p>
          <motion.p variants={showItemsVariants}>Log out</motion.p>
        </motion.div>
      </div>
      <Profile setShowProfile={setShowProfile} showProfile={showProfile} />
    </div>
  );
};

export default StatusBar;
