import 'server-only';
import { cookies } from 'next/headers';
import { decryptToken, COOKIE_NAME } from './session';
import { cache } from 'react';

export const validateSession = cache(async () => {
  const cookie = (await cookies()).get(COOKIE_NAME)?.value;
  const session = typeof cookie === 'string' ? await decryptToken(cookie) : {};

  return {
    isAuthenticated: !!session?.userId,
    userId: session?.userId,
    admin: session?.admin,
  };
});
