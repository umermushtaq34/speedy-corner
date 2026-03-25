import { LOCATIONS } from "./locations";

export const FooterContact = {
  address: "8725 Blue Ridge Blvd Kansas City, MO 64138",
  phone: "+1 913 742 0919",
  email: "info@speedycorner.com",
} as const;

export const FooterLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Promotions", href: "/promotions" },
  { label: "Contact Us", href: "/contact" },
  ...LOCATIONS,
] as const;
