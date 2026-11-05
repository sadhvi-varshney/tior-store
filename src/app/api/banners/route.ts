import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { defaultBannerSlides } from "@/lib/banners";
import { prisma } from "@/lib/prisma";

type BannerPayload = {
  image?: string;
  title?: string;
  subtitle?: string;
  cta?: string;
  href?: string;
  position?: number;
};

const toBannerDto = (banner: {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  position: number;
}) => ({
  id: banner.id,
  image: banner.image,
  title: banner.title,
  subtitle: banner.subtitle,
  cta: banner.cta,
  href: banner.href,
  position: banner.position,
});

export async function GET() {
  let banners = await prisma.bannerSlide.findMany({
    orderBy: { position: "asc" },
  });

  if (banners.length === 0) {
    banners = await prisma.$transaction(
      defaultBannerSlides.map((slide) =>
        prisma.bannerSlide.create({ data: slide }),
      ),
    );
  }

  return NextResponse.json(banners.map(toBannerDto));
}

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as BannerPayload;
  const image = body.image?.trim();
  const title = body.title?.trim();

  if (!image || !title) {
    return NextResponse.json(
      { error: "Image and title are required." },
      { status: 400 },
    );
  }

  try {
    const count = await prisma.bannerSlide.count();
    const banner = await prisma.bannerSlide.create({
      data: {
        image,
        title,
        subtitle: body.subtitle?.trim() ?? "",
        cta: body.cta?.trim() || "Shop Now",
        href: body.href?.trim() || "#products",
        position: body.position ?? count,
      },
    });

    return NextResponse.json(toBannerDto(banner), { status: 201 });
  } catch (error) {
    console.error("Failed to create banner:", error);
    return NextResponse.json(
      { error: "Failed to save banner. Please try again." },
      { status: 500 },
    );
  }
}
