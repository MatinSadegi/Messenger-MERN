import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForMobile } from "../../utils/mediaQuery";
import { setShowInbox, setUserProfile } from "../../redux/chatSlice";
import { logout } from "../../redux/authSlice";
import { showSideBarVariant } from "../../utils/variants";
import message from "../../assets/icons/message-regular.svg";
import group from "../../assets/icons/user-group-solid.svg";

const SideBar = ({ setInbox, showSideBar, setShowSideBar }) => {
  const forMobile = useForMobile();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showInbox = useSelector((state) => state.chat.showInbox);
  const userInfo = useSelector((state) => state.auth.user.user);

  return (
    <motion.div
      className="sidebar"
      variants={showSideBarVariant}
      animate={!showSideBar && forMobile ? "hidden" : "visible"}
    >
      <div className="sidebar__container">
        <div className="app-name">
          <img
            src="https://img.icons8.com/emoji/45/000000/water-wave.png"
            alt="wave"
            className="app-name__logo"
          />
          <p className="app-name__title">Wave</p>
        </div>
        <ul className="sidebar__list">
          <li className="sidebar__item" onClick={() => setInbox("Messages")}>
            <img src={message} alt="message" />
            <span>Messages</span>
          </li>
          <li className="sidebar__item" onClick={() => setInbox("Groups")}>
            <img src={group} alt="group" />
            <span>Groups</span>
          </li>
        </ul>
        <div className="sidebar__setting">
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
