import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../redux/chatSlice";
import moment from "moment";

const Card = ({ chat }) => {
  const dispatch = useDispatch();
  const signedUser = useSelector((state) => state.auth.user.user);
  const newMessages = useSelector((state) => state.message.receivedMessages);
  const [notification, setNotification] = useState(0);
  const lastMessageTime = chat.latestMessage && chat.latestMessage.updatedAt;
  useEffect(() => {
    newMessages.forEach((message) => {
      if (message.chatId._id === chat._id) {
        setNotification(notification + 1);
      }
    });
  }, [newMessages]);

  return (
    <div
      className="card"
      onClick={() => {
        dispatch(setSelectedChat(chat));
        setNotification(0);
      }}
      // style={{ display: chat.latestMessage ? "flex" : "none" }}
    >
      <div className="card__left">
        <div className="card__profile-group">
          {chat.users.map((user) => {
            if (user._id !== signedUser._id) {
              return (
                <img
                  key={user._id}
                  className="profile-img"
                  src={`${user.avatar.url}`}
                />
              );
            }
          })}
        </div>
        <div className="card__info">
          {chat.isGroupChat ? (
            <p>{chat.chatName}</p>
          ) : (
            <p>
              {chat.users.map((user) => {
                if (user._id !== signedUser._id) {
                  return `${user.firstName} ${user.lastName}`;
                }
              })}
            </p>
          )}
          <p>
            {chat.latestMessage && chat.latestMessage.content.length > 40
              ? `${chat.latestMessage.content.substring(0, 21)}"..."`
              : chat.latestMessage && chat.latestMessage.content.length < 40
              ? chat.latestMessage.content
              : "No message ..! "}
          </p>
        </div>
      </div>
      <div className="card__status">
        <p>{moment(lastMessageTime).format("LT")}</p>
        <p style={{ display: notification === 0 ? "none" : "flex" }}>
          {notification}
        </p>
      </div>
    </div>
  );
};

export default Card;
