'use client';

import { BoxArrowInLeft } from 'react-bootstrap-icons';
import Button from '#/Button';
import { useRouter } from 'next/navigation';

const BackButton = function ({
  backButtonTo,
  value = null,
  classes = 'btn-secondary',
  tooltip = 'Go back',
}) {
  const router = useRouter();

  const handleOnClick = function () {
    if (backButtonTo === -1) router.back();
    else router.push(backButtonTo);
  };
  return (
    <Button classes={classes} onClick={handleOnClick} tooltip={tooltip}>
      {value === null ? <BoxArrowInLeft size={24} /> : value}
    </Button>
  );
};

export default function ContentHeader({
  backButton = true,
  backButtonTo = -1,
  title = '',
  children,
}) {
  return (
    <div className='d-flex align-items-center col-12 border-bottom pb-2 mb-3'>
      {backButton && (
        <BackButton
          backButtonTo={backButtonTo}
          value={typeof backButton !== 'boolean' ? backButton : null}
        />
      )}
      <span className='fw-semibold px-2'>{title}</span>
      {children}
    </div>
  );
}
