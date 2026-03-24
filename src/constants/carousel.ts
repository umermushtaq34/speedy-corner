export type CarouselSlide = {
  title: string;
  eyebrow: string;
  description: string;
  buttonTitle: string;
  buttonLink: string;
  imageUrl: string;
};

export const HERO_CAROUSEL_SLIDES: readonly CarouselSlide[] = [
  {
    eyebrow: "Welcome To",
    title: "Speedy Corner",
    description: "Fresh. Fast. Convenient",
    buttonTitle: "Locations",
    buttonLink: "/contact",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
  },
  {
    eyebrow: "Fresh Stops",
    title: "Fuel Up And Grab A Bite",
    description: "Fast service with a cleaner, brighter roadside experience",
    buttonTitle: "Promotions",
    buttonLink: "/promotions",
    imageUrl:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1800&q=80",
  },
  {
    eyebrow: "Neighborhood Ready",
    title: "Built For Every Journey",
    description: "Coffee, convenience, and quick essentials all in one stop",
    buttonTitle: "About Us",
    buttonLink: "/about",
    imageUrl:
      "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?auto=format&fit=crop&w=1800&q=80",
  },
] as const;
