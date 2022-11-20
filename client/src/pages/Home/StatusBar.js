import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { setUserProfile } from "../../redux/chatSlice";
import { showItemsVariants } from "../../utils/variants.js";

const StatusBar = () => {
  const [showItems, setShowItems] = useState(false);
  const userInfo = useSelector((state) => state.auth.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="status-bar__container">
      <div className="status-bar__top">
       

        <motion.div
          className="items"
          initial={false}
          animate={showItems ? "open" : "close"}
          variants={showItemsVariants}
        >
          <motion.p
            variants={showItemsVariants}
            onClick={() =>
              dispatch(setUserProfile({ show: true, info: userInfo }))
            }
          >
            Edit Profile
          </motion.p>
          <motion.p
            variants={showItemsVariants}
            onClick={() => {
              dispatch(logout());
              navigate("/auth");
            }}
          >
            Log out
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default StatusBar;
