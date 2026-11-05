export type BannerSlide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  position: number;
};

export const defaultBannerSlides: Omit<BannerSlide, "id">[] = [
  {
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b87b67746f?auto=format&fit=crop&w=1600&q=80",
    title: "SUMMER COLLECTION",
    subtitle: "Fresh styles for the season — up to 40% off",
    cta: "Shop Men",
    href: "#products",
    position: 0,
  },
  {
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80",
    title: "NEW ARRIVALS",
    subtitle: "Discover the latest curated picks",
    cta: "Shop Women",
    href: "#products",
    position: 1,
  },
  {
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80",
    title: "FLASH SALE",
    subtitle: "Limited time offers on bestsellers",
    cta: "Shop All",
    href: "#products",
    position: 2,
  },
];
