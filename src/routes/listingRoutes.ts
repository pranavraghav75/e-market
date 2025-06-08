import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing
} from '../controllers/listingController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', asyncHandler(getAllListings));
router.get('/:id', asyncHandler(getListingById));

// protected routes by JWT
router.post('/', protect, asyncHandler(createListing));
router.put('/:id', protect, asyncHandler(updateListing));
router.delete('/:id', protect, asyncHandler(deleteListing));

export default router;
