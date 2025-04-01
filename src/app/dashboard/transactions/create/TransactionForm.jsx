'use client';

import Input from '#/form/Input';
import { createTransaction } from '@/app/actions/transactions';
import Select from '#/form/Select';
import { startTransition, useActionState } from 'react';
import ToolBar from '#/ToolBar';
import CheckBox from '#/form/CheckBox';
import TextArea from '#/form/TextArea';

export default function TransactionForm({ categories }) {
  const [state, createTransactionAction, pending] = useActionState(
    createTransaction,
    undefined
  );

  async function handleOnSubmit(event) {
    event.preventDefault();
    startTransition(() =>
      createTransactionAction(new FormData(event.currentTarget))
    );
  }

  function handleBtnCancel() {}

  return (
    <>
      <form className='row g-3' noValidate onSubmit={handleOnSubmit}>
        <Input
          name='date'
          type='date'
          invalidFeedback={state}
          containerClasses='col-auto'
        />
        <Select
          name='categoryId'
          label='Category'
          options={categories}
          invalidFeedback={state}
        />
        <Input
          name='amount'
          type='number'
          containerClasses='col-4'
          invalidFeedback={state}
        />
        <TextArea name='description' rows={2} invalidFeedback={state} />
        <CheckBox name='active' label='Active' isSwitch checked={true} />
        <ToolBar
          classes='w-100'
          gap={3}
          buttons={[
            {
              icon: 'Eraser',
              classes: 'btn-secondary me-auto',
              message: 'Reset form',
              type: 'reset',
            },
            {
              text: 'Cancel',
              classes: 'btn-secondary',
              message: 'Cancel',
              onClick: handleBtnCancel,
            },
            {
              text: 'Save',
              icon: 'Save',
              message: 'Save new transaction',
              type: 'submit',
              busy: pending,
            },
          ]}
        />
      </form>
    </>
  );
}
