import { LOCATIONS } from "./locations";

type NavbarBaseItem = {
  label: string;
};

type NavbarLinkItem = NavbarBaseItem & {
  href: string;
};

type NavbarDropdownItem = NavbarBaseItem & {
  children: readonly NavbarLinkItem[];
};

export type NavbarItem = NavbarLinkItem | NavbarDropdownItem;

export const NAVBAR_LINKS: readonly NavbarItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Locations",
    children: LOCATIONS,
  },
  { label: "About Us", href: "/about" },
  { label: "Promotions", href: "/promotions" },
  { label: "Contact Us", href: "/contact" },
] as const;
