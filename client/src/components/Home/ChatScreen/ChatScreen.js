import React, { useEffect, useState } from "react";
import {Sender} from '../../index'
import io from "socket.io-client";
import { useSelector } from "react-redux";
import {
  useFetchAllMessageQuery,
  useSendMessageMutation,
} from "../../../features/message/MessageApiSlice";

const ChatScreen = () => {
  const currentChat = useSelector((state) => state.chat.selectedChat);
  const [messages, setMessages] = useState([]);
  const [skip, setSkip] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sendMessage] = useSendMessageMutation();
  const { isFetching, currentData } = useFetchAllMessageQuery(
    (currentChat && currentChat._id),
    { skip }
  );

  const sendMessageHandler = async (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      setNewMessage("");
      const { data } = await sendMessage({
        content: newMessage,
        chatId: currentChat._id,
      });
      setMessages([...messages, data]);
      setSkip(false);
    }
  };
  const typeHandler = (e) => {
    setNewMessage(e.target.value);
  };
  useEffect(() => {
    if (currentChat) {
      setSkip(false);
    }
  }, [currentChat]);

  useEffect(() => {
    io("http://localhost:5000");
  }, []);
  return (
    <div className="chat-screen__container">
      {!currentChat ? (
        <div className="start-chat">
          <p>click on a user to start chatting</p>
        </div>
      ) : (
        <div className="chat-screen">
          <div className="chat-screen__header">
            <div className="chat-screen__left">
              {currentChat.isGroupChat ? (
                <div className="card__profile-group">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <div className="card__profile-user"></div>
              )}
              <div className="card__info">
                <p>
                  {currentChat.isGroupChat
                    ? currentChat.chatName
                    : `${currentChat.users[1].firstName} ${currentChat.users[1].lastName}`}
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
          <div className="chat-screen__main">
            {isFetching && (
              <div className="loader__container">
                <span className="loader"></span>
              </div>
            )}
            {currentData && !isFetching && currentData.map(message => <Sender key={message._id} message={message}/>)}
          </div>
          <div className="send-message" onKeyDown={sendMessageHandler}>
            <input
              type="text"
              placeholder="Write a message..."
              value={newMessage}
              onChange={typeHandler}
            />
            <img
              src="https://img.icons8.com/external-anggara-basic-outline-anggara-putra/20/ffffff/external-send-email-interface-anggara-basic-outline-anggara-putra.png"
              alt="send"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;
