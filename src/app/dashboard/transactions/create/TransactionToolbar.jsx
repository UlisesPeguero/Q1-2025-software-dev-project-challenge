'use client';

import ToolBar from '@/app/ui/ToolBar';

export default function TransactionToolbar() {
  return (
    <>
      <ToolBar
        align='right'
        buttons={[
          {
            text: 'Delete',
            message: 'Delete some test.',
            classes: 'btn-danger',
            icon: 'Trash',
            onClick: () => console.log('Delete something'),
          },
          {
            separator: true,
          },
          {
            text: 'Categories',
            message: 'Manage transaction categories',
            icon: 'Table',
            onClick: () => console.log('go to categories'),
          },
        ]}
      />
    </>
  );
}
