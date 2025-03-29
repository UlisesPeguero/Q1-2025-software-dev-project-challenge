'use client';

import { signup } from '@/app/actions/auth/session';
import Input from '@/app/ui/form/Input';
import Button from '@/app/ui/Button';

export default function SignUp() {
  return (
    <>
      <h4 className='col text-center py-2'>Register new user</h4>
      <form action={signup}>
        <Input name='username' label='Username *' />
        <Input name='email' label='Email *' type='email' />
        <Input name='password' label='Password *' type='password' />
        <Input
          name='confirmPassword'
          label='Confirm Password *'
          type='password'
        />
        <div className='d-grid my-2'>
          <Button type='submit' text='Sign Up' />
        </div>
      </form>
    </>
  );
}
