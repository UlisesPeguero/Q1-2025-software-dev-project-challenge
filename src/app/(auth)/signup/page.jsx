'use client';

import Link from 'next/link';
import { signup } from '@/app/actions/auth/session';
import Input from '@/app/ui/form/Input';
import Button from '@/app/ui/Button';
import { startTransition, useActionState } from 'react';

export default function SignUp() {
  const [state, signupAction, pending] = useActionState(signup, undefined);

  async function handleSignup(event) {
    event.preventDefault();
    startTransition(() => signupAction(new FormData(event.currentTarget)));
  }

  return (
    <>
      <h4 className='col text-center py-2'>New user</h4>
      <form onSubmit={handleSignup} noValidate>
        <Input
          name='username'
          label='Username *'
          invalidFeedback={state?.errors?.username}
        />
        <Input
          name='email'
          label='Email *'
          type='email'
          invalidFeedback={state?.errors?.email}
        />
        <Input
          name='password'
          label='Password *'
          type='password'
          invalidFeedback={state?.errors?.password}
        />
        <Input
          name='confirmPassword'
          label='Confirm Password *'
          type='password'
          invalidFeedback={state?.errors?.confirmPassword}
        />
        <div className='d-grid my-2'>
          <Button type='submit' text='Sign Up' />
        </div>
      </form>
      <div className='col text-center my-3'>
        Already registered? <Link href='/login'>Login</Link>
      </div>
    </>
  );
}
