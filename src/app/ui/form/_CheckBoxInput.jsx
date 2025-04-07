import React from 'react';

export default function _CheckBoxInput({
  id,
  name,
  label,
  checked = false,
  containerClasses = '',
  inputClasses = '',
  labelClasses = '',
  reverse,
  labelLocation = 'right',
  onValueChange,
  ...rest
}) {
  const _containerClass =
    'form-check ' + containerClasses + (reverse ? ' form-check-reverse' : '');
  const _inputClass = 'form-check-input ' + inputClasses;
  const _labelClass = 'form-check-label ' + labelClasses;
  const _id = id ? id : name;

  if (typeof checked === 'object') checked = checked[name];

  if (typeof onValueChange === 'function') {
    rest.onChange = ({ target }) => {
      let data = {};
      data[name] = target.checked;
      onValueChange(data);
    };
  }

  return (
    <>
      <div className={_containerClass}>
        {label && labelLocation == 'left' && (
          <label htmlFor={_id} className={_labelClass}>
            {label}
          </label>
        )}
        <input
          id={_id}
          name={name}
          className={_inputClass}
          checked={checked}
          {...rest}
        />
        {label && labelLocation === 'right' && (
          <label htmlFor={_id} className={_labelClass}>
            {label}
          </label>
        )}
      </div>
    </>
  );
}
