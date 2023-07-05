import React, { useEffect, useState } from "react";
import { Sender, Header, Typing } from "../../index";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  setMessages,
  setNewMessage,
  setNotifications,
} from "../../../redux/messageSlice";
import {
  useFetchAllMessageQuery,
  useSendMessageMutation,
} from "../../../services/messageApiSlice";
import { setOnlineUsers } from "../../../redux/chatSlice";
let socket, selectedChatCompare;
const ChatScreen = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);
  const newMessage = useSelector((state) => state.message.newMessage);
  const notifications = useSelector((state) => state.message.notifications);
  const currentChat = useSelector((state) => state.chat.selectedChat);
  const signedUser = useSelector((state) => state.auth.user.user);
  const [socketConnected, setSocketConnected] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [skip, setSkip] = useState(true);
  const [isTyping, setIsTyping] = useState({ typing: false, name: "" });
  const [sendMessage] = useSendMessageMutation();
  const { isFetching, currentData, isSuccess } = useFetchAllMessageQuery(
    currentChat && currentChat._id,
    {
      skip,
      refetchOnMountOrArgChange: true,
    }
  );
  // useEffect(() => {
  //   socket = io("http://localhost:5000");
  //   socket.on("connected", () => setSocketConnected(true));
  //   socket.emit("setup", signedUser);
  //   socket.on("typing", (name) => setIsTyping({typing:true , name}));
  //   socket.on("stop typing", () => setIsTyping({typing:false , name:""}));
  // }, []);

  // when user sign in to the app
  useEffect(() => {
    socket = io("http://localhost:5000");
  }, []);
  //user connect to socket and add online users
  useEffect(() => {
    if (socket) {
      socket.emit("setup", signedUser);
      socket.on("getOnlineUsers", (res) => dispatch(setOnlineUsers(res)));
    }
  }, [signedUser,dispatch]);

  //when we join chat it function work and get chat data and all messages
  useEffect(() => {
    if (currentChat) {
      setSkip(false);
      if (isSuccess && currentData) {
        dispatch(setMessages(currentData));
        selectedChatCompare = currentChat;
      }
    }
  }, [currentChat, isFetching,dispatch,isSuccess,currentData]);

  //send message
  useEffect(() => {
    if (newMessage) {
      socket.emit("send message", newMessage);
    }
  }, [newMessage]);
  // receive message
  useEffect(() => {
    socket.on("get message", (res) => {
      // console.log(selectedChatCompare._id, res.chatId._id);
      if (!selectedChatCompare || selectedChatCompare._id !== res.chatId._id) {
        dispatch(setNotifications([...notifications, res]));
      } else {
        dispatch(setMessages([...messages, res]));
      }
    });
  }, [messages, notifications,dispatch]);

  const sendMessageHandler = async (e) => {
    if (e.key === "Enter" || e.target.alt === "send") {
      //save message in database
      const { data } = await sendMessage({
        content: textMessage,
        chatId: currentChat._id,
      });
      //send message and add it to messages list

      dispatch(setNewMessage(data));
      dispatch(setMessages([...messages, data]));
      setTextMessage("");
    }
  };
  const typeHandler = (e) => {
    setTextMessage(e.target.value);
  };

  return (
    <div className="chat-screen__container">
      {!currentChat ? (
        <div className="start-chat">
          <p>click on a user to start chatting</p>
        </div>
      ) : (
        <div className="chat-screen">
          <Header currentChat={currentChat} signedUser={signedUser} />
          <div className="chat-screen__main">
            {isFetching && (
              <div className="loader__container">
                <span className="loader"></span>
              </div>
            )}
            {isTyping.typing ? (
              <Typing currentChat={currentChat} name={isTyping.name} />
            ) : (
              ""
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
              value={textMessage}
              onChange={typeHandler}
              onFocus={() => socket.emit("typing", signedUser.firstName)}
              onBlur={() => socket.emit("stop typing")}
            />
            <button onClick={sendMessageHandler}>
              <img
                src="https://img.icons8.com/external-anggara-basic-outline-anggara-putra/20/ffffff/external-send-email-interface-anggara-basic-outline-anggara-putra.png"
                alt="send"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;
