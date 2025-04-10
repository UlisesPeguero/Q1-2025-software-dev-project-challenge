'use server';

import { addTransaction, updateTransaction } from '@/lib/data/transactions';
import TransactionSchema from '@/lib/data/schemas/TransactionSchema';
import { validateData } from '@/lib/formUtils';
import { redirect } from 'next/navigation';

export async function updateTransactionAction(state, data) {
  const isUpdate = !!data?.id;
  const validation = validateData(
    data,
    isUpdate ? TransactionSchema : TransactionSchema.omit('active')
  );

  if (!validation.success) {
    return {
      errors: validation.errors,
    };
  }

  validation.data.amount *= 100; //turn to integer to avoid rounding errors with JS

  const hadDBErrors = isUpdate
    ? update(state, validation.data)
    : create(state, validation.data);

  return hadDBErrors;
}

export async function create(state, data) {
  const result = await addTransaction(data);
  if (!result) {
    return {
      dbError: "The transaction couldn't be created.",
      created: false,
    };
  }
  //revalidatePath('/transactions'); // refresh cache for the grid
  redirect(`/dashboard/transactions/${result.id}`); // redirect to edit
}

export async function update(state, data) {
  console.log('Update', data);
  const result = await updateTransaction(data);
  if (!result) {
    return {
      dbError: "The transaction couldn't be updated.",
      updated: false,
    };
  }
  //revalidatePath('/transactions'); // refresh cache for the grid
  return {
    updated: true,
  };
}
