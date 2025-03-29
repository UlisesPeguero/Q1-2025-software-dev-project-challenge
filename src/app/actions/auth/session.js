'use server';

import { createSession, deleteSession } from '@/lib/auth/session';
import getRawFormData from '@/lib/getRawFormData';
import { revalidatePath } from 'next/cache';

import { redirect } from 'next/navigation';

export async function login(formData) {
  const data = getRawFormData(formData);

  await createSession(1, true);
  redirect('/dashboard/');
}

export async function signup(formData) {}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
