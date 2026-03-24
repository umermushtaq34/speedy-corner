export type ProvidedService = {
  id:
    | "fuel"
    | "convenient-store"
    | "kitchen"
    | "drinks"
    | "bait"
    | "liquor"
    | "doordash";
  title: string;
};

export const PROVIDED_SERVICES: readonly ProvidedService[] = [
  { id: "fuel", title: "Fuel" },
  { id: "convenient-store", title: "Convenient Store" },
  { id: "kitchen", title: "Kitchen" },
  { id: "drinks", title: "Drinks & Soda's" },
  { id: "bait", title: "Bait" },
  { id: "liquor", title: "Liquor" },
  { id: "doordash", title: "Doordash Delivery" },
] as const;
