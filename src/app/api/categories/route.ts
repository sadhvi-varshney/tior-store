import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
  return NextResponse.json(
    categories.map((category) => ({
      id: category.id,
      name: category.name,
      image: category.image ?? null,
      productCount: category._count.products,
    })),
  );
}

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { name?: string; image?: string };
  const name = body.name?.trim();
  const image = body.image?.trim() || null;

  if (!name) {
    return NextResponse.json({ error: "Category name is required." }, { status: 400 });
  }

  try {
    const category = await prisma.category.create({
      data: { name, image },
    });
    return NextResponse.json({ name: category.name, image: category.image ?? null }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Category already exists or is invalid." },
      { status: 400 },
    );
  }
}

export async function PATCH(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { originalName?: string; name?: string; image?: string | null };
  const name = body.name?.trim();
  const originalName = body.originalName?.trim();

  if (!name || !originalName) {
    return NextResponse.json({ error: "Original and new category name required." }, { status: 400 });
  }

  try {
    const category = await prisma.category.update({
      where: { name: originalName },
      data: { name, image: body.image ?? null },
    });
    return NextResponse.json({ name: category.name, image: category.image ?? null });
  } catch {
    return NextResponse.json({ error: "Category not found." }, { status: 404 });
  }
}

export async function DELETE(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { name?: string };
  const name = body.name?.trim();

  if (!name) {
    return NextResponse.json({ error: "Category name is required." }, { status: 400 });
  }

  try {
    await prisma.category.delete({ where: { name } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Category not found." }, { status: 404 });
  }
}
