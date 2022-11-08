import React, { useEffect, useState } from "react";
import { Sender, Header, Typing } from "../../index";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setReceivedMessages } from "../../../redux/messageSlice";
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
  const [isTyping, setIsTyping] = useState({typing:false , name:""});
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
    socket.on("typing", (name) => setIsTyping({typing:true , name}));
    socket.on("stop typing", () => setIsTyping({typing:false , name:""}));
    socket.on("connected", () => setSocketConnected(true));
  }, []);
  useEffect(() => {
    if (currentChat) {
      setSkip(false);
      if (isSuccess && currentData) {
        setMessages(currentData);
        socket.emit("join chat", currentChat._id);
        selectedChatCompare = currentChat;
      }
    }else{
      socket.emit("stop typing");
    }
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
      }
    });
  });
  const sendMessageHandler = async (e) => {
    if (e.key === "Enter" || e.target.alt ==="send") {
      socket.emit('stop typing')
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
          <Header currentChat={currentChat} signedUser={signedUser} />
          <div className="chat-screen__main">
            {isFetching && (
              <div className="loader__container">
                <span className="loader"></span>
              </div>
            )}
            {isTyping.typing ? <Typing currentChat={currentChat} name={isTyping.name} /> :""}
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
              onFocus={() => socket.emit("typing", signedUser.firstName)}
              onBlur={() => socket.emit("stop typing")}
            />
            <img
              src="https://img.icons8.com/external-anggara-basic-outline-anggara-putra/20/ffffff/external-send-email-interface-anggara-basic-outline-anggara-putra.png"
              alt="send"
              onClick={sendMessageHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;
