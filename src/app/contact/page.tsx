import type { Metadata } from "next";
import { ContactFormSection } from "@/components/contact-form-section";
import { FooterContact } from "@/constants/footer";
import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us | Speedy Corner",
  description:
    "Contact Speedy Corner for customer support, promotions, partnerships, location questions, and general feedback.",
  path: "/contact",
  keywords: [
    "contact Speedy Corner",
    "Speedy Corner customer support",
    "Speedy Corner phone number",
    "Speedy Corner email",
    "Speedy Corner address",
  ],
});

const CONTACT_INTRO_LINES = [
  "Have a question, feedback, or need assistance?",
  "Our team is always ready to help. Whether it's about a location, service, or general inquiry, we'd love to hear from you.",
  "Fill out the form below and we'll get back to you as soon as possible.",
] as const;

export default function ContactPage() {
  const webPageSchema = buildWebPageSchema({
    title: "Contact Us | Speedy Corner",
    description:
      "Contact Speedy Corner for customer support, promotions, partnerships, location questions, and general feedback.",
    path: "/contact",
    type: "ContactPage",
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);
  const contactPointSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Speedy Corner",
    mainEntity: {
      "@type": "Organization",
      name: "Speedy Corner",
      email: FooterContact.email,
      telephone: FooterContact.phone,
      address: FooterContact.address,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointSchema) }}
      />
      <ContactFormSection
        contactInfo={FooterContact}
        mainHeading="Get in Touch with Speedy Corner"
        mainSubheading="We're here to help - anytime you need us."
        introLines={[...CONTACT_INTRO_LINES]}
      />
    </>
  );
}
