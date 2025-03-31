'use client';

import ContentHeader from '#/dashboard/content/ContentHeader';
import ToolBar from '#/ToolBar';
import { useRouter } from 'next/navigation';

export default function Transactions() {
  const router = useRouter();

  function handleAddClick(event) {
    router.push('./create');
  }

  return (
    <>
      <ContentHeader title='Transactions'>
        <ToolBar
          gap={2}
          buttons={[
            {
              text: 'New',
              message: 'Add a new transaction.',
              icon: 'Plus',
              onClick: handleAddClick,
            },
            {
              text: 'Roles and Privileges',
              message: 'View Roles and Privileges.',
              // icon: 'Table',
              onClick: () => console.log('Other test something'),
            },
          ]}
        />
        <div id='usersGridToolbar' className='ms-auto'></div>
      </ContentHeader>
    </>
  );
}
