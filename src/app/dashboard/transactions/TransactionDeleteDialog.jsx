import QuestionDialog from '@/app/ui/QuestionDialog';
import React from 'react';

export default function TransactionDeleteDialog({ show, onClose, onConfirm }) {
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
      This action will remove the transaction from the database permanently, do
      you wish to continue?
    </QuestionDialog>
  );
}
