import '@/app/globals.css';
import './public.css';
import { Icon } from '#/Icon';

export default function PublicLayout({ children }) {
  return (
    <div className='d-flex align-items-center bg-light h-100'>
      <main className='m-auto'>
        <div className='col text-center'>
          <Icon iconName='CashStack' size={48} color='#7579eb' />
        </div>
        <p className='col fs-2 text-center mb-2 d-flex align-items-center'>
          Finance Tracker
        </p>
        {children}
      </main>
    </div>
  );
}
