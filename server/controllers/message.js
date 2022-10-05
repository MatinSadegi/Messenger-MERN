import Message from '../models/message.js';

//POST send message
export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || chatId) {
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
    message = await message.populate('sender', '-password');
  } catch (error) {
    res.status(400).json({ messages: error });
  }
};

//GET get all message
export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate(
      'sender',
      '-password'
    );
    res.status(200).json(messages)
  } catch (error) {
    res.status(400).json({message: error});
  }
};
