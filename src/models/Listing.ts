import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IListing extends Document {
  seller: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'new' | 'used';
  campus: string;
  images: string[];
}

const ListingSchema: Schema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    condition: {
      type: String,
      enum: ['new', 'used'],
      default: 'used'
    },
    campus: {
      type: String,
      required: true,
      trim: true
    },
    images: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

ListingSchema.index({ title: 'text', description: 'text' });
ListingSchema.index({ campus: 1, category: 1, price: 1 });

export default mongoose.model<IListing>('Listing', ListingSchema);
