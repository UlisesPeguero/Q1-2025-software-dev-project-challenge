'use client';

import { ToastContainer } from 'react-toastify';
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';

export default function Notifications() {
  const { notifications, clear } = useNotificationCenter();
  return (
    <>
      <ToastContainer position='top-center' />
    </>
  );
}
