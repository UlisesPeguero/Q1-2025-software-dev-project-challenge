import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BoxArrowInLeft } from 'react-bootstrap-icons';
import Button from '../../ui/Button';

const BackButton = function ({ backButtonTo, value = null, classes = 'btn-secondary', tooltip = 'Go back' }) {
  const navigate = useNavigate();

  const handleOnClick = function () {
    console.log('BackButton', backButtonTo);
    navigate(backButtonTo);
  };
  return <Button classes={classes} onClick={handleOnClick} tooltip={tooltip}>
    {
      backButtonTo === -1 && value === null
        ? <BoxArrowInLeft size={24} />
        : value
    }
  </Button>;
};

export default function ContentHeader({
  backButton = true,
  backButtonTo = -1,
  title = '',
  children
}) {

  return (
    <div className="d-flex align-items-center col-12 border-bottom pb-2 mb-3">
      {
        backButton && <BackButton backButtonTo={backButtonTo} value={typeof backButton !== 'boolean' ? backButton : null} />
      }
      <span className='fw-semibold px-2'>{title}</span>
      {
        children
      }
    </div>
  );
}
