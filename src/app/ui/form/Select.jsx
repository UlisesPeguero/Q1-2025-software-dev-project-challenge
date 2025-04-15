import React, { useEffect, useState } from 'react';

export default function Select({
  name,
  selectedValue: _selectedValue,
  label,
  options = [],
  containerClasses = 'col-12',
  selectClasses = '',
  labelClasses = '',
  onValueChange,
  onChange,
  value,
  emptySelection = 'Select an option',
  invalidFeedback = null,
  ...rest
}) {
  // const [selectedValue, setSelectedValue] = useState();

  // useEffect(() => {
  //   if (typeof rest?.value === 'object') _selectedValue = rest.value[name];
  //   setSelectedValue(_selectedValue);
  // }, []);

  const _containerClass = containerClasses;
  const _selectClass = 'form-select ' + selectClasses;
  const _labelClass = 'form-label ' + labelClasses;

  if (!options) options = [];
  if (typeof invalidFeedback === 'object')
    invalidFeedback = invalidFeedback?.errors?.[name];
  if (typeof label === 'undefined')
    label = name.charAt(0).toUpperCase() + name.slice(1);

  // const handleSelectedOption = ({ target }) => {
  //   setSelectedValue(target.value);
  //   if (typeof onChange === 'function') onChange(target.value);
  //   if (typeof onChangeSelection === 'function') {
  //     let data = {};
  //     data[name] = target.value;
  //     onChangeSelection(data);
  //   }
  // };

  if (typeof value === 'object') value = value[name];
  if (typeof onValueChange === 'function') {
    onChange = ({ target }) => {
      let data = {};
      data[name] = target.value;
      onValueChange(data);
    };
  }

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
        value={value}
        onChange={onChange}>
        {emptySelection && <option value='-1'>{emptySelection}</option>}
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
