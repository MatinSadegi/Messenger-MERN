import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile, setShowInbox } from "../../../redux/chatSlice";

const Header = () => {
  const dispatch = useDispatch();
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  const currentChat = useSelector((state) => state.chat.selectedChat);
  const signedUser = useSelector((state) => state.auth.user.user);
  let receiver;
  currentChat.users.forEach((user) => {
    if (user._id !== signedUser._id) {
      receiver = user;
      
    }
  });

  return (
    <div className="chat-screen__header">
      <div className="chat-screen__left">
        <img
          src="https://img.icons8.com/fluency-systems-filled/18/A9A9A9/long-arrow-left.png"
          alt="arrow-left"
          onClick={() => dispatch(setShowInbox(true))}
        />
        <div className="card__profile-group">
          {currentChat.users.map((user) => {
            if (user._id !== signedUser._id) {
              return (
                <img
                  key={user._id}
                  className="profile-img"
                  src={`${user.avatar.url}`}
                  onClick={() =>
                    dispatch(setUserProfile({ info: user, show: true }))
                  }
                  alt="user-profile"
                />
              );
            }
          })}
        </div>
        <div className="card__info">
          <p>
            {currentChat.isGroupChat
              ? currentChat.chatName
              : receiver && `${receiver.firstName} ${receiver.lastName}`}
          </p>
          <p>
            {currentChat.isGroupChat
              ? `${currentChat.users.length} Members `
              : onlineUsers?.some((user) => user?.userId === receiver?._id) ? "online" : ""}
          </p>
        </div>
      </div>
      <div className="chat-screen__right">
        <img
          src="https://img.icons8.com/fluency-systems-regular/18/A9A9A9/microphone--v1.png"
          alt="voice"
        />
        <img
          src="https://img.icons8.com/fluency-systems-filled/18/A9A9A9/phone.png"
          alt="phone"
        />
      </div>
    </div>
  );
};

export default Header;
