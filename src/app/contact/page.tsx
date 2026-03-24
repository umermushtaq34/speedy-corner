import type { Metadata } from "next";
import { ContactFormSection } from "@/components/contact-form-section";

export const metadata: Metadata = {
  title: "Contact Us | Speedy Corner",
  description:
    "Get in touch with Speedy Corner for feedback, promotions, partnerships, and customer support.",
};

export default function ContactPage() {
  return <ContactFormSection />;
}
