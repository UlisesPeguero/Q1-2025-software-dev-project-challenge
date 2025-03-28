import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
import BootstrapClient from '@/lib/BootstrapClient';

export const metadata = {
  title: 'Finance Tracker',
  description: 'Finance Tracker - 1st Quarter Challenge 2025',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
