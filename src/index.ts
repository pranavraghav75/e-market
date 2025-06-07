import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

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

app.get('/', (_req: Request, res: Response) => {
  res.send('API is running 🚀');
});

app.get('/test-user', async (_req: Request, res: Response) => {
  const User = (await import('./models/User')).default;
  const u = await User.create({
    name: 'Pranav',
    email: 'test@gmail.com',
    password: 'test',
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));