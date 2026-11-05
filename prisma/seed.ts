import { PrismaClient } from "@prisma/client";
import { initialProducts } from "../src/lib/productStore";

const prisma = new PrismaClient();

async function main() {
  for (const product of initialProducts) {
    const category = await prisma.category.upsert({
      where: { name: product.category },
      update: {},
      create: { name: product.category },
    });

    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        rating: product.rating,
        amazonUrl: product.amazonUrl,
        categoryId: category.id,
        images: {
          create: product.images.map((url, index) => ({
            url,
            position: index,
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
