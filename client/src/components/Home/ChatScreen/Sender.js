import React from "react";
import moment from 'moment';
import { useSelector } from "react-redux";

const Sender = ({ message }) => {
  const signedUser = useSelector((state) => state.auth.user);
  const { sender, content, createdAt } = message;
  const sendTime = moment(createdAt).format("LT");
  return (
    <div
      className="message__container"
      style={{
        justifyContent:
          signedUser.existingUser._id === sender._id
            ? "flex-end"
            : "flex-start",
      }}
    >
      <div
        className={
          signedUser.existingUser._id === sender._id
            ? "message__send"
            : "message__receive"
        }
      >
        <p>{content}<span>{sendTime}</span></p>
      </div>
    </div>
  );
};

export default Sender;