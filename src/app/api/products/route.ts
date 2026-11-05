import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type ProductPayload = {
  name?: string;
  description?: string;
  price?: string;
  rating?: number;
  amazonUrl?: string;
  category?: string;
  images?: string[];
  tag?: string | null;
};

const toProductDto = (product: {
  id: number;
  name: string;
  description: string;
  price: string;
  rating: number;
  amazonUrl: string;
  tag: string | null;
  category: { name: string };
  images: Array<{ url: string }>;
}) => {
  const orderedImages = product.images.map((image) => image.url);
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    rating: product.rating,
    amazonUrl: product.amazonUrl,
    tag: product.tag ?? null,
    category: product.category.name,
    image: orderedImages[0] ?? "",
    images: orderedImages,
  };
};

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: { orderBy: { position: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products.map(toProductDto));
}

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as ProductPayload;
  const name = body.name?.trim();
  const description = body.description?.trim();
  const price = body.price?.trim();
  const amazonUrl = body.amazonUrl?.trim();
  const categoryName = body.category?.trim();
  const rating = Number(body.rating ?? 4);
  const images = (body.images ?? []).map((image) => image.trim()).filter(Boolean);
  const tag = body.tag ?? null;

  if (!name || !description || !price || !amazonUrl || !categoryName || images.length === 0) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const category = await prisma.category.findUnique({
    where: { name: categoryName },
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found." }, { status: 400 });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        rating: Number.isFinite(rating) ? rating : 4,
        amazonUrl,
        tag,
        categoryId: category.id,
        images: {
          create: images.map((url, index) => ({
            url,
            position: index,
          })),
        },
      },
      include: {
        category: true,
        images: { orderBy: { position: "asc" } },
      },
    });

    return NextResponse.json(toProductDto(product), { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json({ error: "Failed to create product." }, { status: 500 });
  }
}

