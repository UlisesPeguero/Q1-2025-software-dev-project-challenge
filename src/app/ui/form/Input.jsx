import React, { useState } from 'react';

function SimpleInput({ name, type, classes, ...rest }) {
  const inputClass = 'form-control ' + classes;
  return (
    <input id={name} name={name} type={type} className={inputClass} {...rest} />
  );
}

function SimpleTextArea({ name, classes, rows = null, ...rest }) {
  return (
    <textarea
      id={name}
      name={name}
      rows={rows}
      className={('form-control ' + classes).trim()}
      {...rest}></textarea>
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

  const _Input = type === 'textarea' ? SimpleTextArea : SimpleInput;

  invalidFeedback = invalidFeedback?.errors[name];
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
        classes={inputClasses + (invalidFeedback ? ' is-invalid' : '')}
        {...rest}
      />
      {invalidFeedback && (
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
      )}
    </div>
  );
}

export { SimpleInput };
