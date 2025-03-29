'use client';

import { login } from '@/app/actions/auth/session';
import Button from '#/Button';
import Input from '#/form/Input';
import Link from 'next/link';
import { Icon } from '@/app/ui/Icon';

export default function Login() {
  return (
    <>
      <form action={login}>
        <Input name='username' label='Username' />
        <Input name='password' label='Password' type='password' />
        <div className='d-grid my-2'>
          <Button type='submit' text='Login' />
        </div>
      </form>
      <div className='col text-center my-3'>
        New user? <Link href='/signup'>Sign Up</Link>
      </div>
    </>
  );
}
