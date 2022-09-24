import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
//Routes
import userRoutes from './routes/users.js'

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
dotenv.config();
connectDB()
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/user', userRoutes);
app.use('/', (req, res) => {
    res.send("hello")
})

//Run when client connects
io.on('connection', (socket) => {
  console.log('new WS connection..');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`server is running on port ${PORT}`));
