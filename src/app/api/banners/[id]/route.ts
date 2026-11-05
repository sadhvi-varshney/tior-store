import { unlink } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type BannerPayload = {
  image?: string;
  title?: string;
  subtitle?: string;
  cta?: string;
  href?: string;
  position?: number;
};

const removeUploadedFile = async (imagePath: string) => {
  if (!imagePath.startsWith("/banners/")) {
    return;
  }

  const filePath = path.join(process.cwd(), "public", imagePath);
  try {
    await unlink(filePath);
  } catch {
    // File may already be removed.
  }
};

export async function PATCH(request: Request, context: RouteContext) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const bannerId = Number.parseInt(id, 10);

  if (!Number.isFinite(bannerId)) {
    return NextResponse.json({ error: "Invalid banner id." }, { status: 400 });
  }

  const body = (await request.json()) as BannerPayload;
  const existing = await prisma.bannerSlide.findUnique({ where: { id: bannerId } });

  if (!existing) {
    return NextResponse.json({ error: "Banner not found." }, { status: 404 });
  }

  const nextImage = body.image?.trim();
  if (nextImage && nextImage !== existing.image) {
    await removeUploadedFile(existing.image);
  }

  try {
    const banner = await prisma.bannerSlide.update({
      where: { id: bannerId },
      data: {
        ...(nextImage ? { image: nextImage } : {}),
        ...(body.title?.trim() ? { title: body.title.trim() } : {}),
        ...(body.subtitle !== undefined ? { subtitle: body.subtitle.trim() } : {}),
        ...(body.cta?.trim() ? { cta: body.cta.trim() } : {}),
        ...(body.href?.trim() ? { href: body.href.trim() } : {}),
        ...(body.position !== undefined ? { position: body.position } : {}),
      },
    });

    return NextResponse.json({
      id: banner.id,
      image: banner.image,
      title: banner.title,
      subtitle: banner.subtitle,
      cta: banner.cta,
      href: banner.href,
      position: banner.position,
    });
  } catch (error) {
    console.error("Failed to update banner:", error);
    return NextResponse.json(
      { error: "Failed to update banner. Please try again." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const bannerId = Number.parseInt(id, 10);

  if (!Number.isFinite(bannerId)) {
    return NextResponse.json({ error: "Invalid banner id." }, { status: 400 });
  }

  try {
    const banner = await prisma.bannerSlide.delete({ where: { id: bannerId } });
    await removeUploadedFile(banner.image);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Banner not found." }, { status: 404 });
  }
}
