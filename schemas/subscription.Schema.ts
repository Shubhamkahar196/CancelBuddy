
import { z } from 'zod';

export const createSubscriptionSchema = z.object({
  serviceName: z.string().min(1),
  planName: z.string().optional(),
  amountInPaise: z.number().int().nonnegative(),
  currency: z.string().min(3).default('INR'),
  billingCycle: z.enum(['MONTHLY','YEARLY','CUSTOM']).default('MONTHLY'),
  nextRenewalDate: z.string().refine(s => !Number.isNaN(Date.parse(s)), { message: 'Invalid date' }),
  trialEndsAt: z.string().optional(),
  reminderDaysBefore: z.number().int().min(0).max(365).default(3),
  usageFrequency: z.enum(['DAILY','WEEKLY','MONTHLY','RARELY']).optional(),
  metadata: z.record(z.any()).optional(),
});
