import express from 'express';
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroup,
} from '../controllers/chat.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.route('/').get(protect, fetchChats).post(protect, accessChat);
router.post('/group', protect, createGroupChat);
router.put('/rename', protect, renameGroup);
router.put('/groupremove', protect, removeFromGroup);
router.put('/groupadd', protect, addToGroup);

export default router;
