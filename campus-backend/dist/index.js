"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const listingRoutes_1 = __importDefault(require("./routes/listingRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.MONGO_URI, {
// you can add options here if needed
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/messages', messageRoutes_1.default);
app.use('/api/listings', listingRoutes_1.default);
app.get('/', (_req, res) => {
    res.send('API is running');
});
app.get('/test-user', async (_req, res) => {
    const User = (await Promise.resolve().then(() => __importStar(require('./models/User')))).default;
    const u = await User.create({
        name: 'hi',
        email: 'hello@gmail.com',
        password: 'password',
        campus: 'UMD'
    });
    res.json(u);
});
app.get('/test-listing', async (_req, res) => {
    const User = (await Promise.resolve().then(() => __importStar(require('./models/User')))).default;
    const Listing = (await Promise.resolve().then(() => __importStar(require('./models/Listing')))).default;
    const user = await User.findOne();
    if (!user) {
        res.status(400).send('no users found');
        return;
    }
    const l = await Listing.create({
        seller: user._id,
        title: 'Sample Textbook',
        description: 'Great condition, barely used.',
        price: 25,
        category: 'textbooks',
        condition: 'used',
        campus: user.campus,
        images: []
    });
    res.json(l);
});
app.get('/test-message', (async (_req, res) => {
    const User = (await Promise.resolve().then(() => __importStar(require('./models/User')))).default;
    const Listing = (await Promise.resolve().then(() => __importStar(require('./models/Listing')))).default;
    const Message = (await Promise.resolve().then(() => __importStar(require('./models/Message')))).default;
    // find two users and one listing
    const users = await User.find().limit(2);
    if (users.length < 2) {
        return res.status(400).send('Create at least two users via /test-user first');
    }
    const listing = await Listing.findOne();
    if (!listing) {
        return res.status(400).send('Create a listing via /test-listing first');
    }
    // create the chat
    const chat = await Message.create({
        chatBetween: [users[0]._id, users[1]._id],
        listing: listing._id,
        messages: [
            { sender: users[0]._id, content: 'Hi, is this still available?' },
            { sender: users[1]._id, content: 'Yes—it is!' }
        ]
    });
    res.json(chat);
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
