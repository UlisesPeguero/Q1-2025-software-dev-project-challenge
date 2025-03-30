'use client';

import { login } from '@/app/actions/auth/session';
import Button from '#/Button';
import Input from '#/form/Input';
import Link from 'next/link';
import { Icon } from '@/app/ui/Icon';
import { useActionState } from 'react';

export default function Login() {
  const [state, loginAction, pending] = useActionState(login, undefined);
  return (
    <>
      {state?.errors?.auth && (
        <p className='text-danger'>{state?.errors?.auth}</p>
      )}
      <form action={loginAction} noValidate>
        <Input
          name='username'
          label='Username'
          invalidFeedback={state?.errors?.username}
        />
        <Input
          name='password'
          label='Password'
          type='password'
          invalidFeedback={state?.errors?.password}
        />
        <div className='d-grid my-2'>
          <Button type='submit' text='Login' busy={pending} />
        </div>
      </form>
      <div className='col text-center my-3'>
        New user? <Link href='/signup'>Sign Up</Link>
      </div>
    </>
  );
}
