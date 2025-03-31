import '@/app/globals.css';
import './public.css';
import { Icon } from '#/Icon';

export default function PublicLayout({ children }) {
  return (
    <div className='d-flex align-items-center bg-light h-100'>
      <main className='w-100'>
        <div className='m-auto overflow-auto' style={{ width: '300px' }}>
          <div className='col text-center'>
            <Icon iconName='CashStack' size={48} color='#7579eb' />
          </div>
          <p className='col fs-2 text-center'>Finance Tracker</p>
          {children}
        </div>
      </main>
    </div>
  );
}
