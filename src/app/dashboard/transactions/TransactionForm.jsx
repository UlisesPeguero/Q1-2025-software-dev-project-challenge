'use client';

import Input from '#/form/Input';
import { createTransaction } from '@/app/actions/transactions';
import Select from '#/form/Select';
import { startTransition, useActionState, useState, useEffect } from 'react';
import ToolBar from '#/ToolBar';
import CheckBox from '#/form/CheckBox';
import TextArea from '#/form/TextArea';
import { useRouter } from 'next/navigation';

export default function TransactionForm({ data, categories }) {
  const router = useRouter();
  const [transaction, setTransaction] = useState();
  const [isUpdate, setIsUpdate] = useState();
  const [state, createTransactionAction, pending] = useActionState(
    createTransaction,
    undefined
  );

  useEffect(() => {
    setTransaction(data);
    setIsUpdate(!!data);
    console.log(data);
  }, [transaction]);

  async function handleOnSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get('active') === 'on') formData.set('active', true);
    startTransition(() => createTransactionAction(formData));
  }

  function handleBtnCancel() {
    router.replace('../transactions');
  }

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
        {isUpdate && (
          <CheckBox name='active' label='Active' isSwitch checked={true} />
        )}
        <ToolBar
          classes='w-100'
          gap={3}
          buttons={[
            {
              icon: 'Eraser',
              classes: 'btn-secondary me-auto',
              message: 'Reset form',
              busy: pending,
              type: 'reset',
            },
            {
              text: 'Cancel',
              classes: 'btn-secondary',
              message: 'Cancel',
              busy: pending,
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
