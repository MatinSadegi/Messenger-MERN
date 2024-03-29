import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
//Routes
import userRoutes from "./routes/users.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";
import { disconnect } from "process";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});
dotenv.config();
connectDB();
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
//Routes
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/", (req, res) => {
  res.send("hello");
});

// ---------- socket io ------------

let onlineUsers = [];

//Run when client connects
io.on("connection", (socket) => {
  console.log("new WS connection..");
  socket.on("setup", (userData) => {
    !onlineUsers.some((item) => item.userId === userData._id) &&
      onlineUsers.push({
        userId: userData._id,
        socketId: socket.id,
      });
    socket.emit("getOnlineUsers", onlineUsers);
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on('disconnect',()=>{
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
    socket.emit("getOnlineUsers", onlineUsers);
  })

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`User joined ${room}`);
  });
  socket.on("send message", (newMessageReceived) => {
    
    let chat = newMessageReceived.chatId;
    if (!chat?.users) return console.log("users not defined");
    chat?.users.forEach(user => {
      if(user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("get message", newMessageReceived);
    });
    
  });
  socket.off('setup',(userData)=>{
    console.log("User Disconnected")
    socket.leave(userData._id)
  })
});
const PORT = process.env.PORT || 5000;
server.listen(5000, console.log(`server is running on port ${PORT}`));
