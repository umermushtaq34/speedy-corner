import type { Metadata } from "next";
import { ContactFormSection } from "@/components/contact-form-section";
import { FooterContact } from "@/constants/footer";

export const metadata: Metadata = {
  title: "Contact Us | Speedy Corner",
  description:
    "Get in touch with Speedy Corner for feedback, promotions, partnerships, and customer support.",
};

const CONTACT_INTRO_LINES = [
  "Have a question, feedback, or need assistance?",
  "Our team is always ready to help. Whether it's about a location, service, or general inquiry, we'd love to hear from you.",
  "Fill out the form below and we'll get back to you as soon as possible.",
] as const;

export default function ContactPage() {
  return (
    <ContactFormSection
      contactInfo={FooterContact}
      mainHeading="Get in Touch with Speedy Corner"
      mainSubheading="We're here to help - anytime you need us."
      introLines={[...CONTACT_INTRO_LINES]}
    />
  );
}
