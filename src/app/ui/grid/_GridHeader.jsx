import React, { useDeferredValue, useEffect, useState } from 'react';
import { Icon } from '../Icon';

function GridHeaderCell({
  name,
  type = 'string',
  classes = 'text-center',
  style = {},
  label,
  sortable,
  sortingState,
  searchable,
  length,
  onSort,
  sortingExpression,
  formatter, // remove from props for header
  ...rest
}) {
  if (length) style.width = length + (typeof length === 'number' ? 'px' : '');
  style.position = 'sticky';
  style.top = '0px';
  let handleSortClick = null;
  let sortingIcon = null;
  if (sortable) {
    handleSortClick = () => {
      onSort({ name, type, sortFunction: sortable, sortingExpression });
    };
    style.cursor = 'pointer';
    sortingIcon =
      sortingState === null
        ? 'ChevronExpand'
        : sortingState
        ? 'ChevronUp'
        : 'ChevronDown';
  }

  return (
    <th
      className={`${classes} bg-dark-subtle bg-gradient`}
      style={style}
      {...rest}
      onClick={handleSortClick}>
      {label} {sortable && <Icon iconName={sortingIcon} />}
    </th>
  );
}

export default function GridHeader({
  model,
  onSort,
  sorting = { column: {}, state: null },
}) {
  const [sortedColumn, setSortedColumn] = useState(sorting?.column);
  const [sortingState, setSortingState] = useState(sorting?.state);

  useEffect(() => {
    if (sortedColumn?.name) onSort(sortedColumn, sortingState);
  }, [sortedColumn, sortingState]);

  const handleSortingState = (column) => {
    if (column.name === sortedColumn?.name) {
      setSortingState((state) => !state);
    } else {
      setSortedColumn(column);
      setSortingState(true);
    }
  };
  return (
    <thead>
      <tr>
        {model.map((column) => (
          <GridHeaderCell
            key={column.name}
            sortingState={
              column.name === sortedColumn.name ? sortingState : null
            }
            onSort={handleSortingState}
            {...column}
          />
        ))}
      </tr>
    </thead>
  );
}
