
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface INotification extends Document {
  userId: Types.ObjectId;
  subscriptionId?: Types.ObjectId;
  channel: 'EMAIL' | 'SMS' | 'IN_APP' | 'WHATSAPP';
  to: string; // email address or phone
  subject?: string;
  body: string;
  status: 'PENDING'|'SENT'|'FAILED'|'CANCELLED';
  attemptCount: number;
  lastAttemptAt?: Date;
  scheduledAt: Date; // when it should be sent
  sentAt?: Date;
  error?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, index: true },
  subscriptionId: { type: Schema.Types.ObjectId, index: true },
  channel: { type: String, enum: ['EMAIL','SMS','IN_APP','WHATSAPP'], default: 'EMAIL' },
  to: { type: String, required: true },
  subject: { type: String },
  body: { type: String, required: true },
  status: { type: String, enum: ['PENDING','SENT','FAILED','CANCELLED'], default: 'PENDING', index: true },
  attemptCount: { type: Number, default: 0 },
  lastAttemptAt: Date,
  scheduledAt: { type: Date, required: true, index: true },
  sentAt: Date,
  error: { type: String },
  metadata: { type: Schema.Types.Mixed },
}, { timestamps: true });

// Index to find items to send
NotificationSchema.index({ status: 1, scheduledAt: 1 });

export default mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);
