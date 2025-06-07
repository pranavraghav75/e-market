import express from 'express';
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

app.get('/', (_req, res) => {
  res.send('API is running 🚀');
  app.get('/test-user', async (_req, res) => {
    const User = (await import('./models/User')).default;
    const u = await User.create({
      name: 'Pranav',
      email: 'test@gmail.com',
      password: 'test',
      campus: 'UMD'
    });
    res.json(u);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
