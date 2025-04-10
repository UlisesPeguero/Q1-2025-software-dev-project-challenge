import { getFallbackRouteParams } from 'next/dist/server/request/fallback-params';
import React, { useState } from 'react';
import { FileBreakFill } from 'react-bootstrap-icons';
import CurrencyInput from 'react-currency-input-field';

function SimpleInput({ name, type, classes, invalidFeedback, ...rest }) {
  const inputClass = 'form-control ' + classes;
  return (
    <>
      <input
        id={name}
        name={name}
        type={type}
        className={inputClass}
        {...rest}
      />
      <InvalidFeedback invalidFeedback={invalidFeedback} />
    </>
  );
}

function SimpleTextArea({
  name,
  classes,
  rows = null,
  invalidFeedback,
  ...rest
}) {
  return (
    <>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className={('form-control ' + classes).trim()}
        {...rest}></textarea>
      <InvalidFeedback invalidFeedback={invalidFeedback} />
    </>
  );
}

function SimpleCurrencyWrapper({
  name,
  classes,
  onChange,
  invalidFeedback,
  ...rest
}) {
  return (
    <div className='input-group'>
      <span className='input-group-text br-1'>$</span>
      <CurrencyInput
        id={name}
        name={name}
        className={('form-control ' + classes).trim()}
        {...rest}
      />
      <InvalidFeedback invalidFeedback={invalidFeedback} />
    </div>
  );
}

function InvalidFeedback({ invalidFeedback }) {
  if (!invalidFeedback) return null;
  return (
    <div className='invalid-feedback'>
      {invalidFeedback.length > 1 ? (
        <ul>
          {invalidFeedback.map((error) => (
            <li key={error}>- {error} </li>
          ))}
        </ul>
      ) : (
        invalidFeedback
      )}
    </div>
  );
}

export default function Input({
  name,
  label,
  type = 'text',
  containerClasses = 'col-12',
  inputClasses = '',
  initialValue = '',
  invalidFeedback,
  ...rest
}) {
  const _containerClass = '' + containerClasses;
  const _labelClass = 'form-label';

  if (typeof rest.onValueChange === 'function') {
    const onChange = rest.onValueChange;
    delete rest.onValueChange;
    const handleOnChange = (value) => {
      let data = {};
      data[name] = value;
      onChange(data);
    };

    if (type === 'currency')
      rest.onValueChange = (_value, name, values) => handleOnChange(_value);
    else rest.onChange = ({ target }) => handleOnChange(target.value);
  }

  let _Input;
  switch (type) {
    case 'textarea':
      _Input = SimpleTextArea;
      break;
    case 'currency':
      _Input = SimpleCurrencyWrapper;
      type = 'text';
      break;
    default:
      _Input = SimpleInput;
  }

  if (typeof rest.value === 'object') rest.value = rest.value[name];

  if (typeof invalidFeedback === 'object')
    invalidFeedback = invalidFeedback?.errors?.[name];
  if (typeof label === 'undefined')
    label = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className={_containerClass}>
      {label && (
        <label htmlFor={name} className={_labelClass}>
          {label}
        </label>
      )}
      <_Input
        name={name}
        type={type}
        invalidFeedback={invalidFeedback}
        classes={inputClasses + (invalidFeedback ? ' is-invalid' : '')}
        {...rest}
      />
    </div>
  );
}

export { SimpleInput };
