import { z } from 'zod';

const TransactionSchema = z.object({
  id: z.number().optional(),
  date: z.string().date('Select a valid date.'),
  categoryId: z.coerce.number('Invalid selection.').gt(0, 'Invalid selection.'),
  description: z
    .string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .optional(),
  amount: z.coerce
    .number('Amount must be a number.')
    .gt(0, 'Amount has to be greater than 0.'),
  active: z.coerce.boolean(),
});

export default TransactionSchema;
