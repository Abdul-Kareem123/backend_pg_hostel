import { z } from 'zod';

export const bookingSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.email(),
  room: z.string(),
  startDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Invalid start date'
  }),
  endDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Invalid end date'
  })
});
