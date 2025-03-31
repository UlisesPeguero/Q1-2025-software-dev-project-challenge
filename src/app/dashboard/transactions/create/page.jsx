'use client';

import ContentHeader from '@/app/ui/dashboard/content/ContentHeader';
import ToolBar from '@/app/ui/ToolBar';

export default function CreateTransaction() {
  return (
    <>
      <ContentHeader title='Test title'>
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
              text: 'Other stuff',
              message: 'Some other stuff..',
              icon: 'Table',
              onClick: () => console.log('Other something'),
            },
          ]}
        />
      </ContentHeader>
    </>
  );
}
