"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchListings = exports.deleteListing = exports.updateListing = exports.getListingById = exports.getAllListings = exports.createListing = void 0;
const Listing_1 = __importDefault(require("../models/Listing"));
// create a new listing
const createListing = async (req, res) => {
    const { title, description, price, category, condition, campus } = req.body;
    if (!title || !description || !price || !category || !condition || !campus) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    const images = (req.files || [])
        .map(f => f.path);
    const newListing = await Listing_1.default.create({
        seller: req.user._id,
        title,
        description,
        price,
        category,
        condition,
        campus,
        images
    });
    res.status(201).json(newListing);
};
exports.createListing = createListing;
// get all listings - paginated
const getAllListings = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const total = await Listing_1.default.countDocuments();
    const listings = await Listing_1.default.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('seller', 'name campus');
    res.json({ listings, page, pages: Math.ceil(total / limit), total });
};
exports.getAllListings = getAllListings;
// get single listing by ID
const getListingById = async (req, res) => {
    const listing = await Listing_1.default.findById(req.params.id);
    if (!listing) {
        res.status(404).json({ message: 'Listing not found' });
        return;
    }
    res.json(listing);
};
exports.getListingById = getListingById;
// update a listing
const updateListing = async (req, res) => {
    const listing = await Listing_1.default.findById(req.params.id);
    if (!listing) {
        res.status(404).json({ message: 'Listing not found' });
        return;
    }
    if (listing.seller.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'Not authorized' });
        return;
    }
    Object.assign(listing, req.body);
    if (req.files && req.files.length > 0) {
        listing.images = req.files.map(f => f.path);
    }
    const updated = await listing.save();
    res.json(updated);
};
exports.updateListing = updateListing;
// delete a listing
const deleteListing = async (req, res) => {
    const listing = await Listing_1.default.findById(req.params.id);
    if (!listing) {
        res.status(404).json({ message: 'Listing not found' });
        return;
    }
    if (listing.seller.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'Not authorized' });
        return;
    }
    await listing.deleteOne();
    res.json({ message: 'Listing removed' });
};
exports.deleteListing = deleteListing;
// search & filter listings
const searchListings = async (req, res) => {
    const { keyword, category, campus, minPrice, maxPrice, condition } = req.query;
    const filters = {};
    if (keyword)
        filters.$text = { $search: keyword };
    if (category)
        filters.category = category;
    if (campus)
        filters.campus = campus;
    if (condition)
        filters.condition = condition;
    if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice)
            filters.price.$gte = Number(minPrice);
        if (maxPrice)
            filters.price.$lte = Number(maxPrice);
    }
    const results = await Listing_1.default.find(filters)
        .populate('seller', 'name campus')
        .sort({ createdAt: -1 });
    res.json(results);
};
exports.searchListings = searchListings;
