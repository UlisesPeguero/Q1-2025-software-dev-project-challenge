import React, { useState } from 'react';
import CheckBoxInput from './_CheckBoxInput';

export default function CheckBox({
  containerClasses = 'col-12',
  checked: _checked = false,
  isSwitch,
  ...rest
}) {
  const [checked, setChecked] = useState(_checked);
  const handleCheckStatus = () => setChecked(!checked);
  const switchProps = isSwitch
    ? { role: 'switch', containerClasses: 'form-switch' }
    : {};
  return (
    <div className={containerClasses}>
      <CheckBoxInput
        type='checkbox'
        checked={checked}
        onChange={handleCheckStatus}
        {...switchProps}
        {...rest}
      />
    </div>
  );
}
