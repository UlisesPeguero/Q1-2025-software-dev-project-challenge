import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
// expiration time in seconds
const JWT_EXPIRATION_TIME = number(process.env.JWT_EXPIRATION_TIME);
const JWT_ALGORITHM = process.env.JWT_ALGORITHM;
const COOKIE_NAME = 'session';

export async function encryptPayload(payload) {
  return new SignJWT(payload)
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION_TIME)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .sign(secretKey);
}

export async function decryptToken(session) {
  try {
    const { payload } = await jwtVerify(session, secretKey, {
      algorithms: [JWT_ALGORITHM],
    });
    return payload;
  } catch (error) {
    console.log('The session could not be verified');
    console.error(error);
  }
}

function getExpirationDate() {
  return new Date(Date.now() + JWT_EXPIRATION_TIME * 1000);
}

function getSessionCookieParams() {
  return {
    httpOnly: true,
    secure: true,
    expires: getExpirationDate(),
    sameSite: 'lax',
    path: '/',
  };
}

export async function createSession(userId) {
  //TODO: Reasses payload contents
  const sessionCookieParams = buildSessionCookieParams();
  const session = await encryptPayload({
    userId,
    expiresAt: sessionCookieParams.expires,
  });

  (await cookies()).set(COOKIE_NAME, session, sessionCookieParams);
}

export async function updateSession() {
  const session = (await cookies()).get(COOKIE_NAME)?.value;
  const payload = decryptToken(session);

  if (!session || !payload) return null;

  (await cookies()).set(COOKIE_NAME, session, getSessionCookieParams());
}

export async function deleteSession() {
  (await cookies()).delete(COOKIE_NAME);
}
