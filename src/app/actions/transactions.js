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

  if (isUpdate) {
    update(state, validation.data);
  } else {
    //create(state, validation.data);
  }
}

export async function create(state, data) {
  const result = await addTransaction(data);
  if (!result) {
    return {
      dbError: "The transaction couldn't be created.",
    };
  }
  //revalidatePath('/transactions'); // refresh cache for the grid
  redirect(`/transactions/${result.id}`); // redirect to edit
}

export async function update(state, data) {
  const result = await updateTransaction(data);
  if (!result) {
    return {
      dbError: "The transaction couldn't be updated.",
    };
  }
  //revalidatePath('/transactions'); // refresh cache for the grid
}
