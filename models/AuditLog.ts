
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAuditLog extends Document {
  actorUserId?: Types.ObjectId; // who performed the action (system user if automated)
  action: string; // e.g. 'USER_DELETE', 'PAYMENT_REFUND'
  resourceType?: string;
  resourceId?: string;
  ip?: string;
  userAgent?: string;
  detail?: Record<string, any>;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  actorUserId: { type: Schema.Types.ObjectId, index: true },
  action: { type: String, required: true, index: true },
  resourceType: String,
  resourceId: String,
  ip: String,
  userAgent: String,
  detail: { type: Schema.Types.Mixed },
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
