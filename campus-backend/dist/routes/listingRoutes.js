"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const listingController_1 = require("../controllers/listingController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const upload_1 = require("../utils/upload");
const router = express_1.default.Router();
router.get('/search', (0, express_async_handler_1.default)(listingController_1.searchListings));
router.get('/', (0, express_async_handler_1.default)(listingController_1.getAllListings));
router.get('/:id', (0, express_async_handler_1.default)(listingController_1.getListingById));
// protected by JWT auth
router.post('/', authMiddleware_1.protect, upload_1.uploadImages.array('images', 5), (0, express_async_handler_1.default)(listingController_1.createListing));
router.put('/:id', authMiddleware_1.protect, upload_1.uploadImages.array('images', 5), (0, express_async_handler_1.default)(listingController_1.updateListing));
router.delete('/:id', authMiddleware_1.protect, (0, express_async_handler_1.default)(listingController_1.deleteListing));
exports.default = router;
