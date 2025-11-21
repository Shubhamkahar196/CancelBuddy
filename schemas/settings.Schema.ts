import z from "zod";

export const updateSettingsSchema = z.object({
    defaultRemainderDays: z.number().int().min(0).max(365).optional(),
    notificationChannels: z.array(z.object({channel: z.string(), enabled: z.boolean()})).optional(),
    locale: z.string().optional(),
    timezone: z.string().optional(),
});