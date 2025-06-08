import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import messageRoutes from './routes/messageRoutes';
import listingRoutes from './routes/listingRoutes';


dotenv.config();
const app = express();
mongoose.connect(process.env.MONGO_URI!, {
  // you can add options here if needed
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

app.use(cors());
app.use(express.json());

app.use('/api/messages', messageRoutes);
app.use('/api/listings', listingRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('API is running 🚀');
});

app.get('/test-user', async (_req: Request, res: Response) => {
  const User = (await import('./models/User')).default;
  const u = await User.create({
    name: 'hi',
    email: 'hello@gmail.com',
    password: 'password',
    campus: 'UMD'
  });
  res.json(u);
});

app.get('/test-listing', async (_req: Request, res: Response) => {
  const User = (await import('./models/User')).default;
  const Listing = (await import('./models/Listing')).default;

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
  const User = (await import('./models/User')).default;
  const Listing = (await import('./models/Listing')).default;
  const Message = (await import('./models/Message')).default;

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
}) as RequestHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));