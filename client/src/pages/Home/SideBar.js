import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForMobile } from "../../utils/mediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setShowInbox, setUserProfile } from "../../redux/chatSlice";
import { logout } from "../../redux/authSlice";
import { showSideBarVariant } from "../../utils/variants";
import message from "../../assets/icons/message-regular.svg";
import group from "../../assets/icons/user-group-solid.svg";

const SideBar = ({ setInbox, showSideBar, setShowSideBar }) => {
  const forMobile = useForMobile();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showInbox = useSelector((state) => state.chat.showInbox);
  const userInfo = useSelector((state) => state.auth.user.user);
  console.log(showSideBar);

  return (
    <motion.div
      className="side-bar"
      variants={showSideBarVariant}
      animate={!showSideBar && forMobile ? "hidden" : "visible"}
    >
      <div className="side-bar__container">
        <div className="logo__div">
          <img
            src="https://img.icons8.com/emoji/45/000000/water-wave.png"
            alt="wave"
          />
          <p>Wave</p>
        </div>
        <ul>
          <li onClick={() => setInbox("Messages")}>
            <img src={message} alt="message" />
            <span>Messages</span>
          </li>
          <li onClick={() => setInbox("Groups")}>
            <img src={group} alt="group" />
            <span>Groups</span>
          </li>
        </ul>
        <div className="setting">
          <button
            onClick={() =>
              dispatch(setUserProfile({ show: true, info: userInfo }))
            }
          >
            Profile
          </button>
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/auth");
            }}
          >
            Logout
          </button>
        </div>
        <img
          src="https://img.icons8.com/external-those-icons-fill-those-icons/30/f1f5f9/external-right-arrows-those-icons-fill-those-icons-3.png"
          alt="arrow-right"
          onClick={() => dispatch(setShowInbox(!showInbox))}
        />
      </div>
      <div
        className="dark-background"
        onClick={() => setShowSideBar(false)}
      ></div>
    </motion.div>
  );
};

export default SideBar;
