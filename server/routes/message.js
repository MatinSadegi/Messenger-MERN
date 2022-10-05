import express from 'express';
import { allMessages, sendMessage } from '../controllers/message.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/',protect,sendMessage)
router.get('/:chatId',protect,allMessages)


export default router