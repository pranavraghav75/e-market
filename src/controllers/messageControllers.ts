import { Request, Response } from 'express';
import Message from '../models/Message';
import Listing from '../models/Listing';

// all chats for current user
export const getChatsForUser = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const chats = await Message.find({
    chatBetween: userId
  })
    .populate('chatBetween', 'name campus')
    .populate('listing', 'title images');
  res.json(chats);
};

// get single chat by ID
export const getChatById = async (req: Request, res: Response) => {
  const chat = await Message.findById(req.params.chatId)
    .populate('chatBetween', 'name campus')
    .populate('listing', 'title images');

  if (!chat) return res.status(404).json({ message: 'Chat not found' });

  // ensure current user is part of chat
  const userId = (req as any).user._id.toString();
  if (!chat.chatBetween.map(id => id.toString()).includes(userId)) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  res.json(chat);
};

// start/get existing chat for a listing
export const createOrGetChat = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { listingId, recipientId } = req.body;

  // validate listing
  const listing = await Listing.findById(listingId);
  if (!listing) return res.status(404).json({ message: 'Listing not found' });

  // prevent messaging yourself
  if (listing.seller.toString() === userId.toString()) {
    return res.status(400).json({ message: 'Cannot message yourself' });
  }

  // find/create
  let chat = await Message.findOne({
    listing: listingId,
    chatBetween: { $all: [userId, recipientId] }
  });

  if (!chat) {
    chat = await Message.create({
      listing: listingId,
      chatBetween: [userId, recipientId],
      messages: []
    });
  }

  // return with populated fields
  chat = await Message.findById(chat._id)
    .populate('chatBetween', 'name campus')
    .populate('listing', 'title images');

  res.json(chat);
};

// send message in existing chat
export const sendMessage = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const chatId = req.params.chatId;
  const { content } = req.body;

  const chat = await Message.findById(chatId);
  if (!chat) return res.status(404).json({ message: 'Chat not found' });

  if (!chat.chatBetween.map(id => id.toString()).includes(userId.toString())) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const newMsg = { sender: userId, content, timestamp: new Date() };
  chat.messages.push(newMsg);
  await chat.save();

  res.json(newMsg);
};