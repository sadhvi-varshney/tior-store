import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim();
  const adminPassword =
    configuredPassword && configuredPassword !== "change-this-admin-password"
      ? configuredPassword
      : "tagasadmin123";

  if (
    process.env.NODE_ENV === "production" &&
    configuredPassword === "change-this-admin-password"
  ) {
    return NextResponse.json(
      { error: "Please set a real ADMIN_PASSWORD in .env for production." },
      { status: 500 },
    );
  }

  if (!body.password || body.password !== adminPassword) {
    return NextResponse.json(
      { error: "Invalid password. Check ADMIN_PASSWORD in .env." },
      { status: 401 },
    );
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
