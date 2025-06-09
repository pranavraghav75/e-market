import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
  searchListings
} from '../controllers/listingController';
import { protect } from '../middleware/authMiddleware';
import { uploadImages } from '../utils/upload';

const router = express.Router();

router.get('/search', asyncHandler(searchListings));
router.get('/',      asyncHandler(getAllListings));
router.get('/:id',   asyncHandler(getListingById));

// protected by JWT auth
router.post('/', protect, uploadImages.array('images', 5), asyncHandler(createListing));
router.put('/:id', protect, uploadImages.array('images', 5), asyncHandler(updateListing));
router.delete('/:id', protect, asyncHandler(deleteListing));

export default router;