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
    detailsLink: "/location/740-nw-shoal-creek",
    directionsLink:
      "http://google.com/maps/place/Speedy+corner+shoal+creek/@39.2318466,-94.6091295,12z/data=!4m10!1m2!2m1!1s740+Northeast+Shoal+Creek+Parkway,+Kansas+City,+Chouteau+Township,+MO,+USA!3m6!1s0x87c05975c69d15d1:0xc6ebda24424d60f6!8m2!3d39.2897448!4d-94.5869868!15sCko3NDAgTm9ydGhlYXN0IFNob2FsIENyZWVrIFBhcmt3YXksIEthbnNhcyBDaXR5LCBDaG91dGVhdSBUb3duc2hpcCwgTU8sIFVTQVpIIkY3NDAgbm9ydGhlYXN0IHNob2FsIGNyZWVrIHBhcmt3YXkga2Fuc2FzIGNpdHkgY2hvdXRlYXUgdG93bnNoaXAgbW8gdXNhkgERY29udmVuaWVuY2Vfc3RvcmWaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMjFrTW1KNmFFTmpRekYxWXpGT1NGbFZjelJsVjNnMVdtNVplR1JZWXhBQuABAPoBBAhIEB8!16s%2Fg%2F11y_s70pnw?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    title: "6701 Blue Ridge Blvd",
    city: "Kansas City, Missouri 64133",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    detailsLink: "/location/6701-blue-ridge-blvd",
    directionsLink:
      "https://www.google.com/maps/place/Speedy+Corner/@39.0020564,-94.4844128,17z/data=!3m1!4b1!4m6!3m5!1s0x87c0e40a3633a7fb:0xd24fe8d263194c3f!8m2!3d39.0020523!4d-94.4818379!16s%2Fg%2F11lgj3_v3s?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    title: "25500 Old Kansas City Rd",
    city: "Hillsdale, KS, 66036",
    imageUrl:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",
    detailsLink: "/location/25500-old-kansas-city-rd",
    directionsLink:
      "https://www.google.com/maps/place/Phillips+66/@38.6648188,-94.8602325,17z/data=!4m15!1m8!3m7!1s0x87c059cdf2b46db7:0xf16343d35868f10b!2sKansas+City,+MO+64155!3b1!8m2!3d39.282939!4d-94.5727598!16s%2Fm%2F01__jk3!3m5!1s0x87c0b1a6f745c5d7:0x332cc8a6a114ca12!8m2!3d38.6648147!4d-94.8553616!16s%2Fg%2F11sbwb8qw9?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    title: "8725 Blue Ridge Blvd",
    city: "Kansas City, Missouri 64138",
    imageUrl:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80",
    detailsLink: "/location/8725-blue-ridge-blvd",
    directionsLink:
      "https://www.google.com/maps/place/Phillips+66/@38.9655376,-94.4994026,17z/data=!3m1!4b1!4m6!3m5!1s0x87c0e6bfc7068ae5:0x6515b007d52661e8!8m2!3d38.9655376!4d-94.4994026!16s%2Fg%2F11tmr33_4g!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
  },
] as const;

export const LOCATIONS = [
  {
    label: "740 NW Shoal Creek ",
    href: "/location/740-nw-shoal-creek",
  },
  {
    label: "6701 Blue Ridge Blvd ",
    href: "/location/6701-blue-ridge-blvd",
  },
  {
    label: "25500 Old Kansas City Rd ",
    href: "/location/25500-old-kansas-city-rd",
  },
  {
    label: "8725 Blue Ridge Blvd ",
    href: "/location/8725-blue-ridge-blvd",
  },
] as const;

const SHOAL_CREEK_IMAGES = Array.from(
  { length: 10 },
  (_, index) => `/740-nw-shoal-creek/740-nw-shoal-creek${index + 1}.jpg`,
);

const BLUE_RIDGE_IMAGES = Array.from(
  { length: 10 },
  (_, index) =>
    `/6701-blue-ridge-blvd/6701-blue-ridge-blvd${index + 1}.jpg`,
);

const HILLSDALE_IMAGES = Array.from(
  { length: 10 },
  (_, index) =>
    `/25500-old-kansas-city-rd/25500-old-kansas-city-rd${index + 1}.jpg`,
);

const SOUTH_BLUE_RIDGE_IMAGES = Array.from(
  { length: 15 },
  (_, index) =>
    `/8725-blue-ridge-blvd/8725-blue-ridge-blvd${index + 1}.jpg`,
);

export const Location_data = [
  {
    name: "Speedy Corner – Shoal Creek",
    slug: "/740-nw-shoal-creek",
    featured_image: "/740-nw-shoal-creek/740-nw-shoal-creek1.jpg",
    tagline: "Fuel up fast at Speedy Corner – Shoal Creek",
    seo_title_variants: [
      "Speedy Corner Shoal Creek | Gas, Snacks & Convenience",
      "Shoal Creek Location | Speedy Corner Kansas City",
    ],
    seo_keywords: [
      "Speedy Corner Shoal Creek",
      "gas station shoal creek",
      "Kansas City convenience store",
      "diesel and premium fuel Kansas City",
      "snacks and drinks near Shoal Creek",
    ],
    description: "Your convenient stop in North Kansas City.",
    features: ["Fast", "Fresh", "Convenient"],
    address: {
      street: "740 NW Shoal Creek Pkwy",
      city: "Kansas City",
      state: "MO",
      zip: "64155",
      country: "USA",
    },
    map_url:
      "http://google.com/maps/place/Speedy+corner+shoal+creek/@39.2318466,-94.6091295,12z/data=!4m10!1m2!2m1!1s740+Northeast+Shoal+Creek+Parkway,+Kansas+City,+Chouteau+Township,+MO,+USA!3m6!1s0x87c05975c69d15d1:0xc6ebda24424d60f6!8m2!3d39.2897448!4d-94.5869868!15sCko3NDAgTm9ydGhlYXN0IFNob2FsIENyZWVrIFBhcmt3YXksIEthbnNhcyBDaXR5LCBDaG91dGVhdSBUb3duc2hpcCwgTU8sIFVTQVpIIkY3NDAgbm9ydGhlYXN0IHNob2FsIGNyZWVrIHBhcmt3YXkga2Fuc2FzIGNpdHkgY2hvdXRlYXUgdG93bnNoaXAgbW8gdXNhkgERY29udmVuaWVuY2Vfc3RvcmWaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMjFrTW1KNmFFTmpRekYxWXpGT1NGbFZjelJsVjNnMVdtNVplR1JZWXhBQuABAPoBBAhIEB8!16s%2Fg%2F11y_s70pnw?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
    about:
      "Located in the Shoal Creek area, this Speedy Corner location offers a clean, modern fueling experience with quick access for commuters and travelers. Whether you're heading to work or on a long drive, we make every stop efficient and easy.",
    image_paths: SHOAL_CREEK_IMAGES,
    services: [
      "Fuel (Regular, Premium, Diesel)",
      "Convenience Store",
      "Snacks & Cold Beverages",
      "Liquor",
      "Coffee Bar",
      "Soda & Beer",
    ],
    why_choose_us: [
      "Easy highway access",
      "Fast service, minimal wait",
      "Clean and well-maintained facility",
    ],
  },
  {
    name: "Speedy Corner – Blue Ridge",
    slug: "/6701-blue-ridge-blvd",
    featured_image: "/6701-blue-ridge-blvd/6701-blue-ridge-blvd1.jpg",
    tagline: "Your quick stop on Blue Ridge Blvd",
    seo_title_variants: [
      "Speedy Corner Blue Ridge | Fuel & Convenience",
      "6701 Blue Ridge Blvd Location | Speedy Corner",
    ],
    seo_keywords: [
      "Speedy Corner Blue Ridge",
      "6701 Blue Ridge Blvd gas station",
      "Kansas City fuel station",
      "convenience store Blue Ridge Blvd",
      "quick stop Kansas City MO",
    ],
    description: "Fast fuel and fresh essentials.",
    features: ["Fast", "Fresh", "Convenient"],
    address: {
      street: "6701 Blue Ridge Blvd",
      city: "Kansas City",
      state: "MO",
      zip: "64133",
      country: "USA",
    },
    map_url:
      "https://www.google.com/maps/place/Speedy+Corner/@39.0020564,-94.4844128,17z/data=!3m1!4b1!4m6!3m5!1s0x87c0e40a3633a7fb:0xd24fe8d263194c3f!8m2!3d39.0020523!4d-94.4818379!16s%2Fg%2F11lgj3_v3s?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
    about:
      "Conveniently located on Blue Ridge Blvd, this Speedy Corner serves the local Kansas City community with fast service, quality fuel, and a fully stocked convenience store.",
    image_paths: BLUE_RIDGE_IMAGES,
    services: [
      "Fuel & Diesel",
      "Convenience Store",
      "Snacks & Drinks",
      "Everyday Essentials",
      "Liquor",
      "Vapes",
      "Coffee Bar",
    ],
    why_choose_us: [
      "Quick and easy stop",
      "Friendly customer service",
      "Great local accessibility",
    ],
  },
  {
    name: "Speedy Corner – Hillsdale",
    slug: "/25500-old-kansas-city-rd",
    featured_image: "/25500-old-kansas-city-rd/25500-old-kansas-city-rd1.jpg",
    tagline: "Serving Hillsdale with speed and convenience",
    seo_title_variants: [
      "Speedy Corner Hillsdale | Fuel & Roadside Convenience",
      "25500 Old Kansas City Rd Location | Speedy Corner",
    ],
    seo_keywords: [
      "Speedy Corner Hillsdale",
      "25500 Old Kansas City Rd gas station",
      "Hillsdale KS convenience store",
      "fuel and snacks Hillsdale",
      "roadside stop near Hillsdale",
    ],
    description: "Your reliable stop on Old Kansas City Road.",
    features: ["Fast", "Fresh", "Convenient"],
    address: {
      street: "25500 Old Kansas City Rd",
      city: "Hillsdale",
      state: "KS",
      zip: "66036",
      country: "USA",
    },
    map_url:
      "https://www.google.com/maps/place/Phillips+66/@38.6648188,-94.8602325,17z/data=!4m15!1m8!3m7!1s0x87c059cdf2b46db7:0xf16343d35868f10b!2sKansas+City,+MO+64155!3b1!8m2!3d39.282939!4d-94.5727598!16s%2Fm%2F01__jk3!3m5!1s0x87c0b1a6f745c5d7:0x332cc8a6a114ca12!8m2!3d38.6648147!4d-94.8553616!16s%2Fg%2F11sbwb8qw9?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
    about:
      "Located in Hillsdale, this location is ideal for drivers traveling through the area. Enjoy quick fueling, refreshments, and a smooth stop before getting back on the road.",
    image_paths: HILLSDALE_IMAGES,
    services: [
      "Fuel Station",
      "Grab & Go Snacks",
      "Cold Drinks & Soda",
      "Bait",
      "Liquor Shop",
    ],
    why_choose_us: [
      "Convenient roadside stop",
      "Quick service for travelers",
      "Clean and easy access",
    ],
  },
  {
    name: "Speedy Corner – South Blue Ridge",
    slug: "/8725-blue-ridge-blvd",
    featured_image: "/8725-blue-ridge-blvd/8725-blue-ridge-blvd1.jpg",
    tagline: "Fast fuel and convenience in South Kansas City",
    seo_title_variants: [
      "Speedy Corner South Blue Ridge | Fuel, Snacks & More",
      "8725 Blue Ridge Blvd Location | Speedy Corner",
    ],
    seo_keywords: [
      "Speedy Corner South Blue Ridge",
      "8725 Blue Ridge Blvd gas station",
      "South Kansas City convenience store",
      "fuel and coffee bar Kansas City",
      "lottery liquor and kitchen Kansas City",
    ],
    description: "Stop by Speedy Corner today.",
    features: ["Fast", "Fresh", "Convenient"],
    address: {
      street: "8725 Blue Ridge Blvd",
      city: "Kansas City",
      state: "MO",
      zip: "64138",
      country: "USA",
    },
    map_url:
      "https://www.google.com/maps/place/Phillips+66/@38.9655376,-94.4994026,17z/data=!3m1!4b1!4m6!3m5!1s0x87c0e6bfc7068ae5:0x6515b007d52661e8!8m2!3d38.9655376!4d-94.4994026!16s%2Fg%2F11tmr33_4g!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
    about:
      "Serving South Kansas City, this Speedy Corner location offers fast service, quality fuel, and a convenient shopping experience for daily commuters and local residents.",
    image_paths: SOUTH_BLUE_RIDGE_IMAGES,
    services: [
      "Fuel (All Grades)",
      "Convenience Store",
      "Snacks & Beverages",
      "Coffee Bar",
      "Vapes",
      "Liquor",
      "Lottery",
      "Kitchen",
    ],
    why_choose_us: ["Prime location", "Fast checkout", "Reliable service"],
  },
] as const;
