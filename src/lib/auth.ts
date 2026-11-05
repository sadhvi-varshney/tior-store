import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const AUTH_COOKIE = "tagas_admin_session";
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

const getSecret = (): Uint8Array => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is missing");
  }

  return new TextEncoder().encode(secret);
};

export const createAdminSession = async (): Promise<void> => {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ONE_DAY_IN_SECONDS}s`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ONE_DAY_IN_SECONDS,
    path: "/",
  });
};

export const clearAdminSession = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
};

export const isAdminAuthenticated = async (): Promise<boolean> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE)?.value;

    if (!token) {
      return false;
    }

    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
};
