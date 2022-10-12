import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../../features/chat/chatSlice";

const Card = ({ chat }) => {
  const dispatch = useDispatch();
  return (
    <div className="card" onClick={() => dispatch(setSelectedChat(chat))}>
      <div className="card__left">
          {chat.isGroupChat ? (
            (<div className="card__profile-group">
              <div></div>
              <div></div>
              <div></div>
            </div>)
          ) : (
            <div className="card__profile-user"></div>
          )}
        <div className="card__info">
          {chat.isGroupChat ? (
            <p>{chat.chatName}</p>
          ) : (
            <p>
              {chat.users[1].firstName} {chat.users[1].lastName}
            </p>
          )}
          <p>Hi there, how are you?</p>
        </div>
      </div>
      <div className="card__status">
        <p>09:00</p>
        <p>3</p>
      </div>
    </div>
  );
};

export default Card;
