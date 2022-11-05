import React from "react";
import moment from 'moment';
import { useSelector } from "react-redux";

const Sender = ({ message }) => {
  const signedUser = useSelector((state) => state.auth.user);
  const { sender, content, createdAt } = message;
  const sendTime = moment(createdAt).format("LT");
  console.log(message.chatId)
  return (
    <div
      className="message__container"
      style={{
        justifyContent:
          signedUser.user._id === sender._id
            ? "flex-end"
            : "flex-start",
      }}
    >
      <div
        className={
          signedUser.user._id === sender._id
            ? "message__send"
            : "message__receive"
        }
      >
        <p>{content}<span>{sendTime}</span></p>
        {message.chatId.isGroupChat && <img src={`${message.sender.avatar.url}`}/>}
      </div>
    </div>
  );
};

export default Sender;
