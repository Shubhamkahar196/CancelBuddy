
import { z } from 'zod';

export const createNotificationSchema = z.object({
  userId: z.string().optional(), // server sets it
  subscriptionId: z.string().optional(),
  channel: z.enum(['EMAIL','SMS','IN_APP','WHATSAPP']).default('EMAIL'),
  to: z.string().min(3),
  subject: z.string().optional(),
  body: z.string().min(1),
  scheduledAt: z.string().refine(s => !Number.isNaN(Date.parse(s))),
});
