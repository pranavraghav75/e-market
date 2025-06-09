// src/models/Message.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  chatBetween: [Types.ObjectId, Types.ObjectId];
  listing: Types.ObjectId;
  messages: {
    sender: Types.ObjectId;
    content: string;
    timestamp: Date;
  }[];
}

const MessageSchema: Schema = new Schema(
  {
    chatBetween: [
      { type: Schema.Types.ObjectId, ref: 'User', required: true },
      { type: Schema.Types.ObjectId, ref: 'User', required: true }
    ],
    listing: { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
    messages: [
      {
        sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

// Prevent duplicate chatBetween+listing pairs
MessageSchema.index({ chatBetween: 1, listing: 1 }, { unique: true });

export default mongoose.model<IMessage>('Message', MessageSchema);
