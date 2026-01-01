import mongoose, { Schema, Document, Model } from "mongoose";

export interface UrlDocument extends Document {
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

const UrlSchema = new Schema<UrlDocument>(
  {
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Url: Model<UrlDocument> =
  mongoose.models.Url || mongoose.model<UrlDocument>("Url", UrlSchema);

export default Url;
