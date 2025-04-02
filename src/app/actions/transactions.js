'use server';

import { addTransaction } from '@/lib/data/transactions';
import TransactionSchema from '@/lib/data/TransactionSchema';
import { validateData } from '@/lib/formUtils';
import { redirect } from 'next/navigation';

export async function createTransaction(state, data) {
  const validation = await validateData(data, TransactionSchema.omit('active'));

  if (!validation.success) {
    return {
      errors: validation.errors,
    };
  }

  //   const result = await addTransaction(validation.data);

  //   if (result.length === 0) {
  //     return {
  //       dbError: 'The transaction could not be saved.',
  //     };
  //   }

  const result = [{ id: 1 }];

  redirect(`/transactions/${result[0].id}`);
}
