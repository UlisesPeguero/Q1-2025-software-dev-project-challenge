'use server';

import { z } from 'zod';
import { createSession, deleteSession } from '@/lib/auth/session';
import { getRawFormData, validateFormData } from '@/lib/formUtils';
import UserSchema from '@/lib/data/UserSchema';
import { redirect } from 'next/navigation';
import sql from '@/lib/db';
import { addUser, verifyPassword } from '@/app/actions/users';

async function createSessionAndRedirect({ id, admin }) {
  await createSession(id, admin); //
  redirect('/dashboard');
}

export async function login(state, formData) {
  const loginSchema = z.object({
    username: z.string().min(1, 'Username is required.'),
    password: z.string().min(1, 'Password is required.'),
  });

  const data = getRawFormData(formData);
  const validation = loginSchema.safeParse(data);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const result =
    await sql`SELECT * FROM app.users WHERE username = ${data.username} LIMIT 1`;

  if (result.length > 0) {
    const user = result[0];

    // if valid credentials -> authorize
    if (await verifyPassword(data.password, user.hashed_password)) {
      await createSessionAndRedirect(user);
    }
  }

  return {
    errors: {
      auth: 'Username or password is incorrect.',
    },
  };
}

export async function signup(state, formData) {
  const [user, validation] = validateFormData(formData, UserSchema);
  if (user.password !== user.confirmPassword) {
    validation.success = false;
    validation.errors.confirmPassword = [
      "Password confirmation doesn't match password.",
    ];
  }
  if (user.confirmPassword === '') {
    validation.success = false;
    validation.errors.confirmPassword = ['Password confirmation is required.'];
  }
  if (!validation.success) {
    return {
      errors: validation.errors,
    };
  }
  //public created user
  user.admin = false;
  const result = await addUser(user);

  if (result.length === 0) {
    return {
      dbError: 'The user could not be saved.',
    };
  }

  await createSessionAndRedirect(result[0]);
}

export async function logout() {
  await deleteSession();
  redirect('/');
}
