import type { MetadataRoute } from "next";
import { Location_data } from "@/constants/locations";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  images?: string[];
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1, images: [`${SITE_URL}/home-promo-banner.webp`] },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/promotions", changeFrequency: "weekly", priority: 0.9, images: [`${SITE_URL}/home-promo-banner.webp`] },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: route.images,
  }));

  const locationEntries: MetadataRoute.Sitemap = Location_data.map(
    (location) => ({
      url: `${SITE_URL}/location/${location.slug.replace(/^\/+/, "")}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      images: [
        `${SITE_URL}${location.featured_image}`,
        ...location.image_paths.map((imagePath) => `${SITE_URL}${imagePath}`),
      ],
    }),
  );

  return [...staticEntries, ...locationEntries];
}
