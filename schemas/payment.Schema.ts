import { z } from 'zod';

export const recordPaymentSchema = z.object({
  userId: z.string(),
  provider: z.enum(['STRIPE','RAZORPAY','MANUAL']),
  providerPaymentId: z.string().optional(),
  amountInPaise: z.number().int().nonnegative(),
  currency: z.string().min(3).default('INR'),
  status: z.enum(['SUCCEEDED','FAILED','PENDING','REFUNDED']).default('PENDING'),
  description: z.string().optional(),
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        