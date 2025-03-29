import React, { useState } from 'react';
import CheckBoxInput from './_CheckBoxInput';

export default function Radio({
  containerClasses = 'col-12',
  options = [],
  name,
  selectedValue: _selectedValue,
  inline,
  ...rest
}) {
  const [selectedValue, setSelectedValue] = useState(_selectedValue);

  const handleSelectedOption = value => {
    setSelectedValue(value);
  };

  return (
    <div className={containerClasses}>
      {
        options.map((option, index) =>
          <CheckBoxInput
            containerClasses={inline ? 'form-check-inline' : null}
            key={name + index}
            type='radio'
            id={name + index}
            name={name}
            checked={option.value === selectedValue}
            onChange={() => handleSelectedOption(option.value)}
            {...option}
          />
        )
      }
    </div>
  );
}
