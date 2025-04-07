import { z } from 'zod';

const TransactionSchema = z.object({
  id: z.number().optional(),
  date: z.string().date(),
  categoryId: z.coerce.number(),
  description: z
    .string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .optional(),
  amount: z.coerce.number().gt(0, 'Amount has to be greater than 0'),
  active: z.coerce.boolean(),
});

export default TransactionSchema;
