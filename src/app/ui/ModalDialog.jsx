'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ToolBar from './ToolBar';
import Button from './Button';

export default function ModalDialog({
  id = 'modalDialog',
  classes,
  isOpen,
  title,
  children,
  onClose,
  footer,
  buttons = null,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // wait until element is loaded to show it
  });

  const handleOnClose = (event) => {
    event.preventDefault();
    if (typeof onClose === 'function') onClose();
  };

  const CustomModal = (
    <div id={id} className={`modal ${isOpen ? 'modal-backdrop' : ''}`}>
      <div className={`modal-dialog ${classes}`}>
        <div className='modal-content shadow'>
          <div className='modal-header bg-dark text-light bg-gradient py-2'>
            <h5 className='modal-title fs-5' id={`${id}Label`}>
              {title}
            </h5>

            <Button
              icon={'X'}
              iconSize={28}
              classes='btn-close-dialog btn-secondary ms-auto'
              onClick={handleOnClose}
            />
          </div>

          <div className='modal-body'>{children}</div>
          {(footer || buttons) && (
            <div className='modal-footer'>
              {footer}
              {buttons && <ToolBar buttons={buttons} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return show
    ? createPortal(CustomModal, document.getElementById('modal-container'))
    : null;
}
