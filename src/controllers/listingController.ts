import { Request, Response } from 'express';
import Listing from '../models/Listing';

// create a new listing
export const createListing = async (req: Request, res: Response) => {
  const { title, description, price, category, condition, campus } = req.body;
  if (!title || !description || !price || !category || !condition || !campus) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  const newListing = await Listing.create({
    seller: (req as any).user._id,
    title,
    description,
    price,
    category,
    condition,
    campus,
    images: []    // will add file-upload later
  });

  res.status(201).json(newListing);
};

// get all listings - paginated
export const getAllListings = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const total = await Listing.countDocuments();
  const listings = await Listing.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('seller', 'name campus');

  res.json({ listings, page, pages: Math.ceil(total / limit), total });
};

// get single listing by ID
export const getListingById = async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404).json({ message: 'Listing not found' });
    return;
  }
  res.json(listing);
};

// update a listing
export const updateListing = async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.id);
  
  if (!listing) {
    res.status(404).json({ message: 'Listing not found' });
    return;
  }

  if (listing.seller.toString() !== (req as any).user._id.toString()) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  Object.assign(listing, req.body);
  const updated = await listing.save();
  res.json(updated);
};

// delete a listing
export const deleteListing = async (req: Request, res: Response): Promise<void> => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404).json({ message: 'Listing not found' });
    return;
  }

  if (listing.seller.toString() !== (req as any).user._id.toString()) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  await listing.deleteOne();
  res.json({ message: 'Listing removed' });
};
