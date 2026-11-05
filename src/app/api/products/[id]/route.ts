import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type ProductPatchPayload = {
  name?: string;
  description?: string;
  price?: string;
  rating?: number;
  amazonUrl?: string;
  category?: string;
  images?: string[];
  tag?: string | null;
};

export async function PATCH(request: Request, context: RouteContext) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const productId = Number.parseInt(id, 10);

  if (!Number.isFinite(productId)) {
    return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
  }

  const body = (await request.json()) as ProductPatchPayload;

  const existing = await prisma.product.findUnique({ where: { id: productId } });
  if (!existing) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  let categoryId: number | undefined;
  if (body.category) {
    const category = await prisma.category.findUnique({ where: { name: body.category.trim() } });
    if (!category) {
      return NextResponse.json({ error: "Category not found." }, { status: 400 });
    }
    categoryId = category.id;
  }

  try {
    // Replace images if provided
    if (body.images && body.images.length > 0) {
      await prisma.productImage.deleteMany({ where: { productId } });
      for (let i = 0; i < body.images.length; i++) {
        await prisma.productImage.create({
          data: { url: body.images[i].trim(), position: i, productId },
        });
      }
    }

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        ...(body.name?.trim() ? { name: body.name.trim() } : {}),
        ...(body.description?.trim() ? { description: body.description.trim() } : {}),
        ...(body.price?.trim() ? { price: body.price.trim() } : {}),
        ...(body.amazonUrl?.trim() ? { amazonUrl: body.amazonUrl.trim() } : {}),
        ...(body.rating !== undefined ? { rating: Number(body.rating) } : {}),
        ...(categoryId !== undefined ? { categoryId } : {}),
        ...("tag" in body ? { tag: body.tag ?? null } : {}),
      },
      include: {
        category: true,
        images: { orderBy: { position: "asc" } },
      },
    });

    const orderedImages = product.images.map((img) => img.url);
    return NextResponse.json({
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
    });
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const productId = Number.parseInt(id, 10);

  if (!Number.isFinite(productId)) {
    return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
  }

  try {
    await prisma.product.delete({ where: { id: productId } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }
}

