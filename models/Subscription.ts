import mongoose, {Schema,Document, Types} from 'mongoose'
import { StringValidation } from 'zod/v3';

export type BillingCycle = 'MONTHLY' | 'YEARLY' | 'CUSTOM';


export interface ISubscription extends Document {
  userId: Types.ObjectId;
  serviceName: string;
  planName?: string;
  amountInPaise: number;
  currency: string; // 'INR' | 'USD' etc.
  billingCycle: BillingCycle;
  nextRenewalDate: Date;
  trialEndsAt?: Date | null;
  reminderDaysBefore: number; // e.g. 3
  status: 'ACTIVE' | 'CANCELLED' | 'PAUSED';
  usageFrequency?: 'DAILY'|'WEEKLY'|'MONTHLY'|'RARELY';
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  externalSubscriptionId?: string; // if linked (Stripe/others)
}

const SubscriptionSchema = new Schema<ISubscription>({
  userId: { type: Schema.Types.ObjectId, required: true, index: true },
  serviceName: { type: String, required: true },
  planName: { type: String },
  amountInPaise: { type: Number, required: true, default: 0 },
  currency: { type: String, default: 'INR' },
  billingCycle: { type: String, enum: ['MONTHLY','YEARLY','CUSTOM'], default: 'MONTHLY' },
  nextRenewalDate: { type: Date, required: true, index: true },
  trialEndsAt: { type: Date },
  reminderDaysBefore: { type: Number, default: 3 },
  status: { type: String, enum: ['ACTIVE','CANCELLED','PAUSED'], default: 'ACTIVE', index: true },
  usageFrequency: { type: String, enum: ['DAILY','WEEKLY','MONTHLY','RARELY'], default: 'MONTHLY' },
  metadata: { type: Schema.Types.Mixed },
  externalSubscriptionId: { type: String, index: true },
}, { timestamps: true });

// Compound index for reminder queries
SubscriptionSchema.index({ nextRenewalDate: 1, status: 1 });
SubscriptionSchema.index({ userId: 1, status: 1 });

export default mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription',SubscriptionSchema);