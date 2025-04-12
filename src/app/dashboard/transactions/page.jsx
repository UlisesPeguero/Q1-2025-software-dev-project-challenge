'use client';

import ContentHeader from '#/dashboard/content/ContentHeader';
import ToolBar from '#/ToolBar';
import { useRouter } from 'next/navigation';

export default function Transactions() {
  const router = useRouter();

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
              onClick: () => router.push('./transactions/create'),
            },
            {
              text: 'Categories',
              message: 'Manage transaction categories',
              icon: 'Table',
              onClick: () => router.push('./transactions/categories'),
            },
          ]}
        />
        <div id='usersGridToolbar' className='ms-auto'></div>
      </ContentHeader>
    </>
  );
}
