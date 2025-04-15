import React from 'react';
import Select from '../form/Select';

export default function GridRowsPerPageSelector({
  gridName,
  onChange,
  customOnChangeHandler,
  selectedValue,
  options = [10, 20, 30],
  label = 'Rows per page',
}) {
  const handleOnChange = (value) => {
    if (typeof customOnChangeHandler === 'function')
      customOnChangeHandler(value);
    onChange(value);
  };

  return (
    <>
      <label htmlFor={gridName + 'RowPerPageSelect'}>{label}&nbsp;</label>
      <Select
        containerClasses=''
        label={null}
        emptySelection={null}
        selectedValue={selectedValue}
        options={options}
        onChange={handleOnChange}
      />
    </>
  );
}
