import mongoose, { Schema, Document, Types } from 'mongoose';


export interface IPayment extends Document {
  userId: Types.ObjectId;
  provider: 'STRIPE' | 'RAZORPAY' | 'MANUAL';
  providerPaymentId?: string;
  amountInPaise: number;
  currency: string;
  status: 'SUCCEEDED' | 'FAILED' | 'PENDING' | 'REFUNDED';
  description?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  userId: { type: Schema.Types.ObjectId, required: true, index: true },
  provider: { type: String, default: 'STRIPE' },
  providerPaymentId: { type: String, index: true },
  amountInPaise: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['SUCCEEDED','FAILED','PENDING','REFUNDED'], default: 'PENDING', index: true },
  description: { type: String },
  metadata: { type: Schema.Types.Mixed },
}, { timestamps: true });


export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);