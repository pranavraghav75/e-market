// filepath: /Users/pranavr/campus-backend/scripts/generateToken.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (userId: string) => {
  const token = jwt.sign(
    { id: userId }, // Payload: user ID
    process.env.JWT_SECRET!, // Secret key from .env
    { expiresIn: '1h' } // Token expiration time
  );
  return token;
};

// Replace 'USER_ID_HERE' with a valid user ID from your database
const userId = '684515c4c138f51d779381d2';
const token = generateToken(userId);

console.log('Generated Token:', token);