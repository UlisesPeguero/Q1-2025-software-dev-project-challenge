import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapClient from '@/util/BootstrapClient';
import AppBar from '#/dashboard/header/AppBar';
import Navigation from '#/dashboard/navigation';
import BreadCrumbs from '#/dashboard/BreadCrumbs';

export const metadata = {
  title: 'Finance Tracker',
  description: 'Finance Tracker - 1st Quarter Challenge 2025',
};

export default function RootLayout({ children }) {
  //TODO Change to DB call
  const modules = [
    {
      id: 1,
      name: 'Home',
      path: '/',
      icon: 'House',
      active: false,
    },
    {
      id: 2,
      name: 'Employees',
      path: '/employees',
      icon: 'PersonRolodex',
      active: false,
    },
    {
      id: 3,
      name: 'Users',
      path: '/users',
      icon: 'PeopleFill',
      active: false,
    },
    {
      id: 4,
      name: 'Settings',
      path: '/settings',
      icon: 'Gear',
      active: false,
    },
  ];
  let activeModule = modules[0];

  return (
    <html lang='en'>
      <body>
        <AppBar appTitle='FINANCE TRACKER' />
        <div className='d-flex'>
          <Navigation modules={modules} activeModule={activeModule} />
          <div className='d-flex flex-column w-100'>
            <BreadCrumbs />
            <main className='content pt-1 px-4  col-lg-12 col-xl-10 col-xxl-8'>
              {children}
            </main>
          </div>
        </div>
        <BootstrapClient />
      </body>
    </html>
  );
}
