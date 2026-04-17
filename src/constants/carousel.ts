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
    imageUrl: "/carousel/carousel-1.jpeg",
  },
  {
    eyebrow: "Fresh Stops",
    title: "Fuel Up And Grab A Bite",
    description: "Fast service with a cleaner, brighter roadside experience",
    buttonTitle: "Promotions",
    buttonLink: "/promotions",
    imageUrl: "/carousel/carousel-2.jpeg",
  },
  {
    eyebrow: "Neighborhood Ready",
    title: "Built For Every Journey",
    description: "Coffee, convenience, and quick essentials all in one stop",
    buttonTitle: "About Us",
    buttonLink: "/about",
    imageUrl: "/carousel/carousel-3.jpeg",
  },
] as const;
