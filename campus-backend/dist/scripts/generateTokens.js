"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (userId) => {
    const token = jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, // from .env
    { expiresIn: '1h' });
    return token;
};
// replace user id here
const userId = '684515c4c138f51d779381d2';
const token = generateToken(userId);
console.log('Generated Token:', token);
