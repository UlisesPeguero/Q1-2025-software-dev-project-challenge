import { getCurrentSession } from '../auth/session';
import sql from '../db';

export async function getProfileInfo() {
  const session = await getCurrentSession();

  if (!session) return null;

  const result = await sql`
    SELECT username, email FROM app.users WHERE id=${session.userId}`;

  if (result.length === 0) return null;

  return result[0];
}
