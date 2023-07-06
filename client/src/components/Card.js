import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat, setShowInbox } from "../redux/chatSlice";
import moment from "moment";
import { setNotifications } from "../redux/messageSlice";

const Card = ({ chat }) => {
  const dispatch = useDispatch();
  const signedUser = useSelector((state) => state.auth.user.user);
  const notifications = useSelector((state) => state.message.notifications);
  const messages = useSelector((state) => state.message.messages);
  const [currentChatNotifications, setCurrentChatNotifications] = useState([]);
  const [cMessage, setCMessage] = useState([]);
  const [lastMessage, setLastMessages] = useState(chat.latestMessage);

  useEffect(() => {

    setCurrentChatNotifications(
      notifications?.filter((message) => message?.chatId?._id === chat._id)
    );
  }, [notifications,chat]);

  useEffect(() => {
    setCMessage(
      messages?.filter((message) => message?.chatId?._id === chat._id)
    );
  }, [messages, chat]);


  useEffect(() => {
    if (currentChatNotifications.length > 0) {
      setLastMessages(
        currentChatNotifications[currentChatNotifications.length - 1]
      );
    } else if (cMessage.length > 0) {
      setLastMessages(cMessage[cMessage.length - 1]);
    }
  }, [currentChatNotifications, cMessage]);

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
        setCurrentChatNotifications([]);
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
            {lastMessage && lastMessage.content.length > 40
              ? `${lastMessage.content.substring(0, 21)}"..."`
              : lastMessage && lastMessage.content.length < 40
              ? lastMessage.content
              : "No message ..! "}
          </p>
        </div>
      </div>
      <div className="card__status">
        <p className="card__timestamp">
          {lastMessage ? moment(lastMessage.updatedAt).format("LT") : ''}
        </p>
        <p
          className="card__notification"
          style={{
            display: currentChatNotifications.length === 0 ? "none" : "flex",
          }}
        >
          {currentChatNotifications.length}
        </p>
      </div>
    </div>
  );
};

export default Card;
