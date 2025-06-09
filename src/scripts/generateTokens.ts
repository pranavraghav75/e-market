import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (userId: string) => {
  const token = jwt.sign(
    { id: userId }, 
    process.env.JWT_SECRET!, // from .env
    { expiresIn: '1h' }
  );
  return token;
};

// replace user id here
const userId = '684515c4c138f51d779381d2';
const token = generateToken(userId);

console.log('Generated Token:', token);
