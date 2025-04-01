'use server';

import { addTransaction } from '@/lib/data/transactions';
import TransactionSchema from '@/lib/data/TransactionSchema';
import sql from '@/lib/db';
import { validateFormData } from '@/lib/formUtils';
import { redirect } from 'next/navigation';

export async function createTransaction(state, formData) {
  const [transaction, validation] = await validateFormData(
    formData,
    TransactionSchema.omit('active')
  );

  if (!validation.success) {
    return {
      errors: validation.errors,
    };
  }

  //   const result = await addTransaction(transaction);

  //   if (result.length === 0) {
  //     return {
  //       dbError: 'The transaction could not be saved.',
  //     };
  //   }

  const result = [{ id: 1 }];

  redirect(`transactions/${result[0].id}`);
}
