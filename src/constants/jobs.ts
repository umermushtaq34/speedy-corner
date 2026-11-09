export type Job = {
  slug: string;
  title: string;
  summary: string;
  expectationSummary: string;
  responsibilities: readonly string[];
  skills: readonly string[];
};

// Add future openings here. Careers pages and the sitemap use this data.
export const JOBS: readonly Job[] = [
  {
    slug: "cashier",
    title: "Cashier",
    summary:
      "Help customers, handle purchases, and keep our stores welcoming, clean, and ready for the next stop.",
    expectationSummary:
      "Speedy Corner is looking for a dependable, customer-focused professional with a strong work ethic who enjoys working in a fast-paced environment, providing excellent customer service, maintaining a clean and organized workplace, and supporting the entire team to achieve business goals.",
    responsibilities: [
      "Welcome customers and provide friendly, helpful service.",
      "Process purchases and handle cash and point-of-sale transactions accurately.",
      "Restock shelves and help maintain organized merchandise displays.",
      "Keep the checkout area and workplace clean and organized.",
      "Communicate with teammates and support daily store operations.",
    ],
    skills: [
      "Customer Service",
      "Cash Handling & POS",
      "Inventory & Merchandising",
      "Teamwork",
      "Communication",
      "Reliability",
      "Attention to Detail",
      "Quick Learner",
      "Clean & Organized Workspace",
    ],
  },
];

export const findJob = (slug: string) => JOBS.find((job) => job.slug === slug);

export const MAX_EMPLOYERS = 6;
export const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const APPLICANT_CERTIFICATION =
  "I certify that all information provided in this application is true and complete to the best of my knowledge. I understand that providing false information may result in the rejection of my application or termination of employment.";
