'use server';

import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from '@/lib/data/transactions';
import TransactionSchema from '@/lib/data/schemas/TransactionSchema';
import { validateData } from '@/lib/formUtils';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function updateTransactionAction(state, data) {
  const isUpdate = !!data?.id;
  const validation = validateData(
    data,
    isUpdate ? TransactionSchema : TransactionSchema.omit('active')
  );
  console.log(data);
  if (!validation.success) {
    return {
      errors: validation.errors,
    };
  }

  validation.data.amount = Math.round(validation.data.amount * 100); //turn to integer to avoid rounding errors with JS

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
  revalidatePath('/dahboard/transactions'); // refresh cache for the grid
  redirect(`/dashboard/transactions/${result.id}?created`); // redirect to edit
}

export async function update(state, data) {
  const result = await updateTransaction(data);
  if (!result) {
    return {
      dbError: "The transaction couldn't be updated.",
      updated: false,
    };
  }
  revalidatePath('/dashboard/transactions'); // refresh cache for the grid
  return {
    updated: true,
  };
}

export async function deleteTransactionAction(id) {
  await deleteTransaction(id);
  revalidatePath('/dashboard/transactions');
  redirect('/dashboard/transactions?deleted');
}

export async function getTransactionsAction(page, rowsPerPage) {
  const result = await getTransactions(page, rowsPerPage);
  if (!result) {
    return {
      dbError: "The transactions couldn't be fetched.",
    };
  }
  return result;
}
