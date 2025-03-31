'use server';

import sql from '@/lib/db';
import bcrypt from 'bcrypt';
import UserSchema from '@/lib/data/UserSchema';

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export async function addUser({ username, email, password, admin }) {
  const result = await sql`
    INSERT INTO app.users(username, email, hashed_password, admin)
    VALUES(
    ${username.toLowerCase()}, 
    ${email}, ${await hashPassword(password)}, 
    ${admin})
  
  returning id, admin`;

  return result;
}

// called from /dashboard/users with admin permissions
export async function createUser(data) {}
