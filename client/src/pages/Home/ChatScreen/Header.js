import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../../redux/chatSlice';

const Header = ({ currentChat, signedUser }) => {
  const dispatch = useDispatch();
  return (
    <div className="chat-screen__header">
      <div className="chat-screen__left">
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
                />
              );
            }
          })}
        </div>
        <div className="card__info">
          <p>
            {currentChat.isGroupChat
              ? currentChat.chatName
              : currentChat.users.map((user) => {
                  if (user._id !== signedUser._id) {
                    return `${user.firstName} ${user.lastName}`;
                  }
                })}
          </p>
          <p>
            {currentChat.isGroupChat
              ? `${currentChat.users.length} Members`
              : "Online"}
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
        <img
          src="https://img.icons8.com/material-outlined/18/A9A9A9/video-call.png"
          alt="video-call"
        />
      </div>
    </div>
  );
};

export default Header