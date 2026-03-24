export type LocationCard = {
  title: string;
  city: string;
  imageUrl: string;
  detailsLink: string;
  directionsLink: string;
};

export const LOCATION_CARDS: readonly LocationCard[] = [
  {
    title: "740 NW Shoal Creek",
    city: "Kansas City, Missouri, 64155",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    detailsLink: "/locations/downtown",
    directionsLink: "https://maps.google.com/?q=740+NW+Shoal+Creek+Kansas+City+Missouri+64155",
  },
  {
    title: "6701 Blue Ridge Blvd",
    city: "Kansas City, Missouri 64133",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    detailsLink: "/locations/gulberg",
    directionsLink: "https://maps.google.com/?q=6701+Blue+Ridge+Blvd+Kansas+City+Missouri+64133",
  },
  {
    title: "25500 Old Kansas City Rd",
    city: "Hillsdale, KS, 66036",
    imageUrl:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",
    detailsLink: "/locations/dha",
    directionsLink: "https://maps.google.com/?q=25500+Old+Kansas+City+Rd+Hillsdale+KS+66036",
  },
  {
    title: "8725 Blue Ridge Blvd",
    city: "Kansas City, Missouri 64138",
    imageUrl:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80",
    detailsLink: "/locations/johar-town",
    directionsLink: "https://maps.google.com/?q=8725+Blue+Ridge+Blvd+Kansas+City+Missouri+64138",
  },
] as const;
