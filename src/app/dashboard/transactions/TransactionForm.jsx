'use client';

import Input from '#/form/Input';
import { updateTransactionAction } from '@/app/actions/transactions';
import Select from '#/form/Select';
import { startTransition, useActionState, useState, useEffect } from 'react';
import ToolBar from '#/ToolBar';
import CheckBox from '#/form/CheckBox';
import TextArea from '#/form/TextArea';
import { useRouter } from 'next/navigation';

export default function TransactionForm({ data, categories }) {
  const router = useRouter();
  const [transaction, setTransaction] = useState({
    date: '',
    categoryId: '',
    amount: '',
    description: '',
    active: '',
  });
  const [isUpdate, setIsUpdate] = useState();
  const [edited, setEdited] = useState(false);
  const [state, transactionAction, pending] = useActionState(
    updateTransactionAction,
    undefined
  );

  useEffect(() => {
    if (data) {
      setTransaction(data);
    }
    setIsUpdate(!!data);
  }, [data]);

  const handleOnChange = (updatedData) => {
    console.log(updatedData);
    setTransaction({
      ...transaction,
      ...updatedData,
    });
    setEdited(true);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(transaction);
    startTransition(() => transactionAction(transaction));
  };

  const handleBtnCancel = () => router.replace('../transactions');

  return (
    <>
      <form className='row g-3' noValidate onSubmit={handleOnSubmit}>
        <Input
          name='date'
          type='date'
          value={transaction}
          onValueChange={handleOnChange}
          invalidFeedback={state}
          containerClasses='col-auto'
        />
        <Select
          name='categoryId'
          label='Category'
          options={categories}
          value={transaction}
          onValueChange={handleOnChange}
          invalidFeedback={state}
        />
        <Input
          name='amount'
          type='currency'
          containerClasses='col-3'
          inputClasses='text-end'
          decimalScale={2}
          allowNegativeValue={false}
          value={transaction}
          onValueChange={handleOnChange}
          invalidFeedback={state}
        />
        <TextArea
          name='description'
          rows={2}
          value={transaction}
          onValueChange={handleOnChange}
          invalidFeedback={state}
        />
        {isUpdate && (
          <CheckBox
            name='active'
            label='Active'
            isSwitch
            checked={transaction}
            onValueChange={handleOnChange}
          />
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
              disabled: !edited,
            },
          ]}
        />
      </form>
    </>
  );
}
