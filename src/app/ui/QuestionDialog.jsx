import React from 'react';
import ModalDialog from './ModalDialog';

export default function QuestionDialog({
  id = 'questionDialog',
  title,
  classes,
  children,
  onConfirm,
  onCancel,
  onClose,
  buttons = {},
  isOpen,
}) {
  const defaultButtons = {
    confirm: {
      text: 'Accept',
      message: 'Accept',
      classes: 'btn-primary',
      icon: 'CheckLg',
      onClick: onConfirm,
    },
    cancel: {
      text: 'Cancel',
      message: 'Cancel',
      classes: 'btn-secondary',
      icon: 'X',
      onClick: onCancel ?? onClose,
    },
  };

  buttons.confirm = { ...defaultButtons.confirm, ...buttons?.confirm };
  buttons.cancel = { ...defaultButtons.cancel, ...buttons?.cancel };
  return (
    <ModalDialog
      id={id}
      classes={classes}
      title={title}
      onClose={onClose}
      isOpen={isOpen}
      buttons={[buttons.confirm, buttons.cancel]}>
      {children}
    </ModalDialog>
  );
}
