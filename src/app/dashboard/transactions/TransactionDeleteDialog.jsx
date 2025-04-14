import QuestionDialog from '@/app/ui/QuestionDialog';
import React from 'react';

export default function TransactionDeleteDialog({
  message,
  show,
  onClose,
  onConfirm,
}) {
  //TODO: add other information about the transaction to be deleted
  return (
    <QuestionDialog
      id='deleteTransactionDialog'
      title='Delete transaction'
      classes='modal-dialog-centered'
      isOpen={show}
      onClose={onClose}
      onConfirm={onConfirm}
      align='right'>
      <div className='d-flex flex-column'>
        <p>
          This action will remove the transaction{' '}
          <span className='fw-semibold'>{message}</span> from the database
          permanently.
        </p>

        <p className='ms-auto px-3 fw-semibold'>Do you wish to continue?</p>
      </div>
    </QuestionDialog>
  );
}
