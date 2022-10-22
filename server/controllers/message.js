import Chat from '../models/chat.js';
import Message from '../models/message.js';
import User from '../models/user.js';

//POST send message
export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log('Invalid data passed into request');
    return res.status(400);
  }
  let newMessage = {
    sender: req.user._id,
    content,
    chatId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await (await message.populate('sender', '-password')).populate('chatId');
    message = await User.populate(message,{
      path:'chatId.users'
    })
    await Chat.findByIdAndUpdate(req.body.chatId,{
      latestMessage : message
    })
    res.status(200).json(message)
  } catch (error) {
    res.status(400).json({ messages: error });
  }
};

//GET get all message
export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId }).populate(
      'sender',
      '-password'
    ).populate('chatId');
    res.status(200).json(messages)
  } catch (error) {
    res.status(400).json({message: error});
  }
};
 