import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name:    process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:       process.env.CLOUDINARY_API_KEY!,
  api_secret:    process.env.CLOUDINARY_API_SECRET!
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'campus_marketplace',
    format: async (_req: Express.Request, file: Express.Multer.File) => file.mimetype.split('/')[1],
    public_id: (_req: Express.Request, file: Express.Multer.File) => `${Date.now()}_${file.originalname}`
  } as any
});

export const uploadImages = multer({ storage });
