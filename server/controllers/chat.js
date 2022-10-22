import Chat from '../models/chat.js';
import User from '../models/user.js';

//POST access or create chat
export const accessChat = async (req, res) => {
  const { userId } = req.body;
  let chatData;
  if (!userId) {
    res.status(400).json('UserId param not sent with request');
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  }).populate('users', '-password')
  // isChat = await User.populate(isChat, {
  //   path: 'latestMessage.sender',
  //   select: 'firstName lastName email',
  // });
  console.log(req.user._id , userId);
  console.log(isChat)

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    } catch (error) {}
  }
};
//GET fetch all chats
export const fetchChats = async (req, res) => {
  try {
    let allChats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate('users', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 });
    allChats = await User.populate(allChats, {
      path: 'latestMessage.sender',
      select: 'firstName lastName email',
    });
    res.status(200).json(allChats);
  } catch (error) {
    console.log(error);
  }
};
//POST create groupChat
export const createGroupChat = async (req, res) => {
  const {groupName, users} = req.body;
  if (!users || !groupName) {
    return res.status(400).json({ message: 'Please fill all the fields' });
  }
  let allUsers = users;
  if (allUsers.length < 2) {
    return res
      .status(400)
      .json({ message: 'More than 2 users are required to form a group chat' });
  }
  allUsers.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: groupName,
      users: allUsers,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
//PUT rename group
export const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  ).populate('users', '-password');
  if (!updatedChat) {
    res.status(404).json({ message: 'Chat Not Found' });
  } else {
    res.status(200).json(updatedChat);
  }
};
//PUT add to group
export const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  ).populate('users', '-password');
  if (!added) {
    res.status(404).json({ message: 'Chat Not Found' });
  } else {
    res.status(200).json(added);
  }
};
//PUT remove from group
export const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  ).populate('users', '-password');
  if (!removed) {
    res.status(404).json({ message: 'Chat Not Found' });
  } else {
    res.status(200).json(removed);
  }
};
