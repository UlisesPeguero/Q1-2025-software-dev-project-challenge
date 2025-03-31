import React, { useState } from 'react';

export default function Select({
  name,
  selectedValue: _selectedValue,
  label,
  options = [],
  containerClasses = 'col-12',
  selectClasses = '',
  labelClasses = '',
  onChange,
  invalidFeedback = nulls,
  ...rest
}) {
  const [selectedValue, setSelectedValue] = useState(_selectedValue);

  const _containerClass = containerClasses;
  const _selectClass = 'form-select ' + selectClasses;
  const _labelClass = 'form-label ' + labelClasses;

  const handleSelectedOption = ({ target }) => {
    setSelectedValue(target.value);
    if (typeof onChange === 'function') onChange(target.value);
  };
  return (
    <div className={_containerClass}>
      {label && (
        <label htmlFor={name} className={_labelClass}>
          {label}
        </label>
      )}
      <select
        name={name}
        id={name}
        aria-label={name}
        className={_selectClass + (invalidFeedback ? ' is-invalid' : '')}
        value={selectedValue}
        onChange={handleSelectedOption}>
        {options.map((option, index) => {
          const id =
            typeof option === 'object' ? option?.id || option.value : option;
          const description =
            typeof option === 'object' ? option?.description || id : option;
          return (
            <option key={id} value={id}>
              {description}
            </option>
          );
        })}
      </select>
      {invalidFeedback && (
        <div className='invalid-feedback'>{invalidFeedback}</div>
      )}
    </div>
  );
}
