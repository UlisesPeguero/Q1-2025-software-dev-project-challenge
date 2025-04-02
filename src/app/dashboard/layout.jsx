import './dashboard.css';

import AppBar from '#/dashboard/header/AppBar';
import BreadCrumbs from '#/dashboard/BreadCrumbs';
import NavigationBar from '#/dashboard/navigation/NavigationBar';

export default function DashboardLayout({ children }) {
  //TODO Change to DB call
  const modules = [
    {
      id: 1,
      name: 'Home',
      path: '/dashboard',
      icon: 'House',
      active: true,
    },
    {
      id: 2,
      name: 'Transactions',
      path: '/dashboard/transactions',
      icon: 'Receipt',
      active: true,
    },
    {
      id: 3,
      name: 'Users',
      path: '/dashboard/users',
      icon: 'PeopleFill',
      active: true,
    },
    {
      id: 4,
      name: 'Settings',
      path: '/dashboard/settings',
      icon: 'Gear',
      active: true,
    },
  ];

  return (
    <>
      <AppBar appTitle='FINANCE TRACKER' />
      <div className='d-flex'>
        <NavigationBar modules={modules} />
        <div className='d-flex flex-column w-100'>
          <BreadCrumbs />
          <div className='scroll-wrapper'>
            <main className=' pt-2 px-4 col bg-light overflow-auto'>
              <div className='content col-lg-12 col-xl-10 col-xxl-8'>
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
