'use client';

import ContentHeader from '#/dashboard/content/ContentHeader';
import ToolBar from '@/app/ui/ToolBar';
import Grid from '@/app/ui/grid/Grid';
import { useRouter } from 'next/navigation';
import { TOOLBAR_ACTIONS as Toolbar } from '@/app/ui/grid/_GridToolBarActions';
import { getTransactionsAction } from '@/app/actions/transactions';

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
      <Grid
        id='usersGrid'
        //endpoint={'/users'}
        api={{
          mode: 'actions',
          getData: getTransactionsAction,
        }}
        height='60vh'
        toolbar={{
          containerId: 'usersGridToolbar',
          search: true,
          buttons: [Toolbar.REFRESH, Toolbar.FILTER, Toolbar.PAGINATION],
        }}
        classes='table-striped table-bordered table-hover'
        // pagination
        pagination={{
          maxPagesShown: 3, // besides prev, next, first and last
          rowsPerPage: 10,
        }}
        currentPage={1}
        model={[
          {
            name: 'id',
            label: 'ID',
            type: 'number',
          },
          {
            name: 'toolbar',
          },
          {
            name: 'date',
            label: 'Date',
            searchable: true,
            sortable: true,
            classes: 'text-center',
            length: 100,
          },
          {
            name: 'category',
            label: 'Category',
            searchable: true,
            sortable: true,
            classes: 'text-center',
            length: 100,
          },
          {
            name: 'amount',
            label: 'Amount',
            formatter: (value) => Number(value).toFixed(2),
            searchable: true,
            sortable: true,
            classes: 'text-end',
            length: 100,
          },
          {
            name: 'description',
            label: 'Description',
            searchable: true,
            sortable: true,
            length: 400,
          },
        ]}
        // data={[
        //   { id: 1, username: 'fox', roles: 'ADMIN' },
        //   { id: 2, username: 'ulises', roles: 'EMPLOYEES.ADMIN' },
        //   { id: 3, username: 'peguero', roles: 'INVOICE.ADMIN, STAYS.ADMIN' },
        //   { id: 4, username: 'ulises2', roles: 'EMPLOYEES.ADMIN' },
        //   { id: 5, username: 'peguero2', roles: 'INVOICE.ADMIN, STAYS.ADMIN' },
        //   { id: 6, username: 'ulises3', roles: 'EMPLOYEES.ADMIN' },
        //   { id: 7, username: 'peguero3', roles: 'INVOICE.ADMIN, STAYS.ADMIN' },
        //   { id: 8, username: 'ulises4', roles: 'EMPLOYEES.ADMIN' },
        //   { id: 9, username: 'peguero4', roles: 'INVOICE.ADMIN, STAYS.ADMIN' },
        //   { id: 10, username: 'ulises5', roles: 'EMPLOYEES.ADMIN' },
        //   { id: 11, username: 'peguero5', roles: 'INVOICE.ADMIN, STAYS.ADMIN' },
        //   { id: 12, username: 'peguero6', roles: 'INVOICE.ADMIN, STAYS.ADMIN' },
        //   { id: 13, username: 'ulises6', roles: 'EMPLOYEES.ADMIN' },
        //   { id: 14, username: 'peguero7', roles: 'INVOICE.ADMIN, STAYS.ADMIN' },
        //   { id: 15, username: 'peguero8', roles: 'INVOICE.ADMIN, STAYS.ADMIN' },
        //   { id: 16, username: 'ulises7', roles: 'EMPLOYEES.ADMIN' },
        //   { id: 17, username: 'peguero9', roles: 'INVOICE.ADMIN, STAYS.ADMIN' },
        //   {
        //     id: 18,
        //     username: 'peguero10',
        //     roles: 'INVOICE.ADMIN, STAYS.ADMIN',
        //   },
        //   { id: 19, username: 'ulises8', roles: 'EMPLOYEES.ADMIN' },
        //   {
        //     id: 20,
        //     username: 'peguero11',
        //     roles: 'INVOICE.ADMIN, STAYS.ADMIN',
        //   },
        //   {
        //     id: 21,
        //     username: 'peguero12',
        //     roles: 'INVOICE.ADMIN, STAYS.ADMIN',
        //   },
        //   { id: 22, username: 'ulises', roles: 'EMPLOYEES.ADMIN' },
        //   {
        //     id: 23,
        //     username: 'peguero13',
        //     roles: 'INVOICE.ADMIN, STAYS.ADMIN',
        //   },
        //   { id: 15, username: 'peguero8', roles: 'INVOICE.ADMIN, STAYS.ADMIN' },
        //   { id: 16, username: 'ulises7', roles: 'EMPLOYEES.ADMIN' },
        //   { id: 17, username: 'peguero9', roles: 'INVOICE.ADMIN, STAYS.ADMIN' },
        //   {
        //     id: 18,
        //     username: 'peguero10',
        //     roles: 'INVOICE.ADMIN, STAYS.ADMIN',
        //   },
        //   { id: 19, username: 'ulises8', roles: 'EMPLOYEES.ADMIN' },
        //   {
        //     id: 20,
        //     username: 'peguero11',
        //     roles: 'INVOICE.ADMIN, STAYS.ADMIN',
        //   },
        //   {
        //     id: 21,
        //     username: 'peguero12',
        //     roles: 'INVOICE.ADMIN, STAYS.ADMIN',
        //   },
        //   { id: 22, username: 'ulises', roles: 'EMPLOYEES.ADMIN' },
        //   {
        //     id: 23,
        //     username: 'peguero13',
        //     roles: 'INVOICE.ADMIN, STAYS.ADMIN',
        //   },
        // ]}
        rowToolBar={[
          {
            icon: 'Trash',
            size: 'sm',
            style: null,
            classes: 'btn-outline-primary',
            onClick: (data) => console.log(`Delete row ID:${data.id}`),
          },
          {
            icon: 'Pen',
            size: 'sm',
            style: null,
            classes: 'btn-outline-primary',
            onClick: (data) =>
              console.log(`Open for edition row ID:${data.id}`),
          },
        ]}
      />
    </>
  );
}
