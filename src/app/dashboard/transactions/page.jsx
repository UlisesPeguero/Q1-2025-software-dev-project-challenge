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
              data: {
                'data-bs-toggle': 'modal',
                'data-bs-target': '#deleteModal',
              },
              //onClick: () => router.push('./transactions/categories'),
            },
          ]}
        />
        <div id='usersGridToolbar' className='ms-auto'></div>
      </ContentHeader>
      <div className='modal' id='deleteModal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Modal title
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='modal-body'>...</div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'>
                Close
              </button>
              <button type='button' className='btn btn-primary'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
