
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name?: string;
  passwordHash?: string | null; // null if OAuth-only
  authProviders: { provider: string; providerId: string }[]; // e.g. google
  plan: 'FREE' | 'PRO' | 'ENTERPRISE';
  planStartedAt?: Date;
  planExpiresAt?: Date | null;
  timezone?: string; // e.g. "Asia/Kolkata"
  locale?: string; // e.g. "en-IN"
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  metadata?: Record<string, any>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, index: true },
  name: { type: String },
  passwordHash: { type: String, default: null },
  authProviders: [{ provider: String, providerId: String }],
  plan: { type: String, enum: ['FREE','PRO','ENTERPRISE'], default: 'FREE' },
  planStartedAt: Date,
  planExpiresAt: Date,
  timezone: { type: String, default: 'UTC' },
  locale: { type: String, default: 'en' },
  isVerified: { type: Boolean, default: false },
  metadata: { type: Schema.Types.Mixed },
}, { timestamps: true });

UserSchema.index({ email: 1 }, { unique: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
