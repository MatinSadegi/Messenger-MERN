import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
//Routes
import userRoutes from './routes/users.js';
import chatRoutes from './routes/chat.js';
import messageRoutes from './routes/message.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  pingTimeout:60000,
  cors: {
    origin: '*',
  },
});
dotenv.config();
connectDB()
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
//Routes
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);
app.use('/', (req, res) => {
    res.send("hello")
})
 
//Run when client connects
io.on('connection', (socket) => {
  console.log('new WS connection..');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`server is running on port ${PORT}`));
