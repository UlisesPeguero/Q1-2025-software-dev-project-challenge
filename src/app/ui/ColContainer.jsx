import React from 'react';

export default function ColContainer({ children, classes = 'col-12' }) {
  return (
    <div className={classes}>
      {children}
    </div>
  );
}
