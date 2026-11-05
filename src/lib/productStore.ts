export type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  image: string;
  images: string[];
  description: string;
  amazonUrl: string;
  tag?: string | null;
};

const PRODUCTS_KEY = "tagas_products";
const CATEGORIES_KEY = "tagas_categories";

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Noise-Cancelling Headphones",
    category: "Electronics",
    price: "$129.00",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Comfort-first over-ear headphones with active noise cancellation, deep bass, and up to 40 hours of battery life for travel and work.",
    amazonUrl: "https://www.amazon.in/dp/B0CHX7R7BR",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: "$89.00",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Track steps, sleep, heart rate, and workouts with a bright AMOLED display and water-resistant design made for daily use.",
    amazonUrl: "https://www.amazon.in/dp/B0D2D5MZXJ",
  },
  {
    id: 3,
    name: "Air Fryer 5L",
    category: "Home & Kitchen",
    price: "$99.00",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Large 5L basket air fryer with quick heating and one-touch presets for fries, veggies, and snacks with less oil.",
    amazonUrl: "https://www.amazon.in/dp/B0CF5RSP7P",
  },
  {
    id: 4,
    name: "Premium Cookware Set",
    category: "Home & Kitchen",
    price: "$149.00",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1584990347449-a5739f4b7f2a?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584990347449-a5739f4b7f2a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583778176476-4a8b02a64c0f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Durable non-stick cookware set with tempered glass lids and even-heat base for everyday cooking in modern kitchens.",
    amazonUrl: "https://www.amazon.in/dp/B0CWSQ8Y8N",
  },
  {
    id: 5,
    name: "Yoga Mat Pro",
    category: "Sports",
    price: "$39.00",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Extra-grip yoga mat with sweat-resistant texture and 6mm cushioning to support yoga, stretching, and home workouts.",
    amazonUrl: "https://www.amazon.in/dp/B0CL4M2Q8F",
  },
  {
    id: 6,
    name: "Adjustable Dumbbells",
    category: "Sports",
    price: "$199.00",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Space-saving adjustable dumbbells with quick-lock dial, ideal for progressive strength training at home.",
    amazonUrl: "https://www.amazon.in/dp/B0C3R5F2TZ",
  },
  {
    id: 7,
    name: "Minimalist Backpack",
    category: "Fashion",
    price: "$59.00",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Lightweight, water-resistant backpack with laptop sleeve and clean design for office, travel, and daily commute.",
    amazonUrl: "https://www.amazon.in/dp/B0D1V9YGF4",
  },
  {
    id: 8,
    name: "Classic Analog Watch",
    category: "Fashion",
    price: "$74.00",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Elegant analog wristwatch with durable strap and classic dial styling that fits both formal and casual outfits.",
    amazonUrl: "https://www.amazon.in/dp/B0CR19T4P6",
  },
];

const initialCategories = Array.from(
  new Set(initialProducts.map((product) => product.category)),
);

const parseJson = <T,>(rawValue: string | null, fallback: T): T => {
  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
};

export const getProducts = (): Product[] => {
  if (typeof window === "undefined") {
    return initialProducts;
  }

  return parseJson<Product[]>(
    window.localStorage.getItem(PRODUCTS_KEY),
    initialProducts,
  );
};

export const saveProducts = (products: Product[]): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const getCategories = (): string[] => {
  if (typeof window === "undefined") {
    return initialCategories;
  }

  return parseJson<string[]>(
    window.localStorage.getItem(CATEGORIES_KEY),
    initialCategories,
  );
};

export const saveCategories = (categories: string[]): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

export const initializeStore = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (!window.localStorage.getItem(PRODUCTS_KEY)) {
    saveProducts(initialProducts);
  }

  if (!window.localStorage.getItem(CATEGORIES_KEY)) {
    saveCategories(initialCategories);
  }
};
