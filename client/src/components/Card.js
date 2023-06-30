import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat, setShowInbox } from "../redux/chatSlice";
import moment from "moment";
import { setNotifications } from "../redux/messageSlice";

const Card = ({ chat }) => {
  const dispatch = useDispatch();
  const signedUser = useSelector((state) => state.auth.user.user);
  const newMessages = useSelector((state) => state.message.messages);
  const notifications = useSelector((state) => state.message.notifications);
  const lastMessageTime = chat.latestMessage && chat.latestMessage.updatedAt;
  const [currentChatNotifications, setCurrentChatNotifications] = useState([]);

  useEffect(() => {
    setCurrentChatNotifications(
      notifications?.filter((message) => message?.chatId?._id === chat._id)
    );
  }, [notifications]);

  return (
    <div
      className="card"
      onClick={() => {
        dispatch(setSelectedChat(chat));
        dispatch(setShowInbox(false));
        dispatch(
          setNotifications(
            notifications.filter((message) => message?.chatId?._id !== chat._id)
          )
        );
        setCurrentChatNotifications([])
      }}
    >
      <div className="card__profile">
        {!chat.isGroupChat ? (
          chat.users.map((user) => {
            if (user._id !== signedUser._id) {
              return (
                <img
                  src={`${user.avatar.url}`}
                  alt="user-profile"
                  key={user._id}
                  className="card__profile-img"
                />
              );
            }
          })
        ) : (
          <div className="card__profile-group">
            {chat.users.slice(0, 3).map((user) => {
              return (
                <img
                  src={`${user.avatar.url}`}
                  alt="user-profile"
                  key={user._id}
                  className="card__profile-img"
                />
              );
            })}
          </div>
        )}

        <div className="card__info">
          {chat.isGroupChat ? (
            <p className="card__chat-name">{chat.chatName}</p>
          ) : (
            <p className="card__chat-name">
              {chat.users.map((user) => {
                if (user._id !== signedUser._id) {
                  return `${user.firstName} ${user.lastName}`;
                }
              })}
            </p>
          )}
          <p className="card__message-content">
            {chat.latestMessage && chat.latestMessage.content.length > 40
              ? `${chat.latestMessage.content.substring(0, 21)}"..."`
              : chat.latestMessage && chat.latestMessage.content.length < 40
              ? chat.latestMessage.content
              : "No message ..! "}
          </p>
        </div>
      </div>
      <div className="card__status">
        <p className="card__timestamp">
          {moment(lastMessageTime).format("LT")}
        </p>
        <p
          className="card__notification"
          style={{
            display: currentChatNotifications.length == 0 ? "none" : "flex",
          }}
        >
          {currentChatNotifications.length}
        </p>
      </div>
    </div>
  );
};

export default Card;
