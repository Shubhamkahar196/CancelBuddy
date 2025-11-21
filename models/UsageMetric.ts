
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUsageMetric extends Document {
  userId?: Types.ObjectId;
  eventType: string; // e.g. 'OPEN_APP', 'DISMISS_NOTIFICATION'
  payload?: Record<string, any>;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}

const UsageMetricSchema = new Schema<IUsageMetric>({
  userId: { type: Schema.Types.ObjectId, index: true },
  eventType: { type: String, required: true, index: true },
  payload: { type: Schema.Types.Mixed },
  ip: String,
  userAgent: String,
}, { timestamps: { createdAt: true, updatedAt: false } });

// index event for analytics
UsageMetricSchema.index({ eventType: 1, createdAt: -1 });

export default mongoose.models.UsageMetric || mongoose.model<IUsageMetric>('UsageMetric', UsageMetricSchema);
