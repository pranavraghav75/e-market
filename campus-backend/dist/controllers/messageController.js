"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.createOrGetChat = exports.getChatById = exports.getChatsForUser = void 0;
const Message_1 = __importDefault(require("../models/Message"));
const Listing_1 = __importDefault(require("../models/Listing"));
// all chats for current user
const getChatsForUser = async (req, res) => {
    const userId = req.user._id;
    const chats = await Message_1.default.find({
        chatBetween: userId
    })
        .populate('chatBetween', 'name campus')
        .populate('listing', 'title images');
    res.json(chats);
};
exports.getChatsForUser = getChatsForUser;
// get single chat by ID
const getChatById = async (req, res) => {
    const chat = await Message_1.default.findById(req.params.chatId)
        .populate('chatBetween', 'name campus')
        .populate('listing', 'title images');
    if (!chat)
        return res.status(404).json({ message: 'Chat not found' });
    // ensure current user is part of chat
    const userId = req.user._id.toString();
    if (!chat.chatBetween.map(id => id.toString()).includes(userId)) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    res.json(chat);
};
exports.getChatById = getChatById;
// start/get existing chat for a listing
const createOrGetChat = async (req, res) => {
    const userId = req.user._id;
    const { listingId, recipientId } = req.body;
    // validate listing
    const listing = await Listing_1.default.findById(listingId);
    if (!listing)
        return res.status(404).json({ message: 'Listing not found' });
    // prevent messaging yourself
    if (listing.seller.toString() === userId.toString()) {
        return res.status(400).json({ message: 'Cannot message yourself' });
    }
    // find/create
    let chat = await Message_1.default.findOne({
        listing: listingId,
        chatBetween: { $all: [userId, recipientId] }
    });
    if (!chat) {
        chat = await Message_1.default.create({
            listing: listingId,
            chatBetween: [userId, recipientId],
            messages: []
        });
    }
    // return with populated fields
    chat = await Message_1.default.findById(chat._id)
        .populate('chatBetween', 'name campus')
        .populate('listing', 'title images');
    res.json(chat);
};
exports.createOrGetChat = createOrGetChat;
// send message in existing chat
const sendMessage = async (req, res) => {
    const userId = req.user._id;
    const chatId = req.params.chatId;
    const { content } = req.body;
    const chat = await Message_1.default.findById(chatId);
    if (!chat)
        return res.status(404).json({ message: 'Chat not found' });
    if (!chat.chatBetween.map(id => id.toString()).includes(userId.toString())) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    const newMsg = { sender: userId, content, timestamp: new Date() };
    chat.messages.push(newMsg);
    await chat.save();
    res.json(newMsg);
};
exports.sendMessage = sendMessage;
