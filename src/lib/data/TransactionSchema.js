import { z } from 'zod';

const TransactionSchema = z.object({
  date: z.date(),
  categoryId: z.number(),
  description: z.string().optional().trim(),
  amount: z.number().min(1),
  active: z.boolean(),
});

export default TransactionSchema;
