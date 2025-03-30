'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import { createSession, deleteSession } from '@/lib/auth/session';
import getRawFormData from '@/lib/getRawFormData';
import { redirect } from 'next/navigation';
import sql from '@/lib/db';

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

    if (await bcrypt.compare(data.password, user.hashed_password)) {
      await createSession(user.id, user.admin);
      redirect('/dashboard');
    }
  }

  return {
    errors: {
      auth: 'Username or password is incorrect.',
    },
  };
}

export async function signup(formData) {}

export async function logout() {
  await deleteSession();
  redirect('/');
}
