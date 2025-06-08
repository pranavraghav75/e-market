import express from 'express';
import {
  getChatsForUser,
  getChatById,
  createOrGetChat,
  sendMessage
} from '../controllers/messageController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getChatsForUser);
router.get('/:chatId', protect, (req, res, next) => {
  getChatById(req, res).catch(next);
});
router.post('/start', protect, (req, res, next) => {
  createOrGetChat(req, res).catch(next);
});
router.post('/:chatId', protect, (req, res, next) => {
    sendMessage(req, res).catch(next);
});

export default router;
