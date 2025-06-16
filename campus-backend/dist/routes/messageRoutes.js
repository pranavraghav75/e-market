"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// protected by JWT auth
router.get('/', authMiddleware_1.protect, messageController_1.getChatsForUser);
router.get('/:chatId', authMiddleware_1.protect, (req, res, next) => {
    (0, messageController_1.getChatById)(req, res).catch(next);
});
router.post('/start', authMiddleware_1.protect, (req, res, next) => {
    (0, messageController_1.createOrGetChat)(req, res).catch(next);
});
router.post('/:chatId', authMiddleware_1.protect, (req, res, next) => {
    (0, messageController_1.sendMessage)(req, res).catch(next);
});
exports.default = router;
