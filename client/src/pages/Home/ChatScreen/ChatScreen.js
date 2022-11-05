import React, { useEffect, useState } from "react";
import { Sender } from "../../index";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setReceivedMessages } from "../../../redux/messageSlice";
import { setUserProfile } from "../../../redux/chatSlice";
import {
  useFetchAllMessageQuery,
  useSendMessageMutation,
} from "../../../services/messageApiSlice";
let socket, selectedChatCompare;
const ChatScreen = () => {
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.chat.selectedChat);
  const signedUser = useSelector((state) => state.auth.user.user);
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [skip, setSkip] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sendMessage] = useSendMessageMutation();
  const { isFetching, currentData, isSuccess } = useFetchAllMessageQuery(
    currentChat && currentChat._id,
    {
      skip,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.emit("setup", signedUser);
    socket.on("connected", () => setSocketConnected(true));
  }, []);
  useEffect(() => {
    if (currentChat) {
      setSkip(false);
      if (isSuccess && currentData) {
        setMessages(currentData);
      }
      socket.emit("join chat", currentChat._id);
    }
    selectedChatCompare = currentChat;
  }, [currentChat, currentData]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        newMessageReceived.chatId._id !== selectedChatCompare._id
      ) {
        dispatch(setReceivedMessages(newMessageReceived));
      } else {
        setMessages([...messages, newMessageReceived]);
        console.log(newMessageReceived);
      }
    });
  });
  const sendMessageHandler = async (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      setNewMessage("");
      const { data } = await sendMessage({
        content: newMessage,
        chatId: currentChat._id,
      });
      setMessages([...messages, data]);
      socket.emit("new message", data);
    }
  };
  const typeHandler = (e) => {
    setNewMessage(e.target.value);
  };

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
          <div className="chat-screen__main">
            {isFetching && (
              <div className="loader__container">
                <span className="loader"></span>
              </div>
            )}
            {messages &&
              !isFetching &&
              [...messages].reverse().map((message) => {
                if (message.chatId._id === currentChat._id) {
                  return <Sender key={message._id} message={message} />;
                }
              })}
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
