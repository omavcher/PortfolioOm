import type { Metadata } from "next";
import ContactClient from "./ContactClient";

const BASE = "https://omavchar.space";

export const metadata: Metadata = {
  title: "Contact Om Avchar | Backend Engineer & System Designer",
  description:
    "Get in touch with Om Avchar for Backend Engineering roles, System Design consulting, AI pipelines development, or collaborations. Based in Nagpur, India.",
  keywords: [
    "Contact Om Avchar",
    "Om Avchar email",
    "Hire backend engineer India",
    "Freelance system designer India",
    "Nagpur software developer contact",
  ],
  alternates: {
    canonical: `${BASE}/contact`,
  },
  openGraph: {
    title: "Contact Om Avchar | Backend Engineer & System Designer",
    description:
      "Get in touch with Om Avchar for Backend Engineering roles, System Design consulting, or collaborations. Based in Nagpur, India.",
    url: `${BASE}/contact`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact Om Avchar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Om Avchar | Backend Engineer",
    description: "Get in touch with Om Avchar for Backend Engineering roles, System Design, or collaborations.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Om Avchar",
    "description": "Contact form and social links to get in touch with Om Avchar, Backend Engineer.",
    "url": `${BASE}/contact`,
    "mainEntity": {
      "@type": "Person",
      "name": "Om Avchar",
      "email": "omavchar@gmail.com",
      "jobTitle": "Backend Engineer",
      "sameAs": [
        "https://github.com/omavcher",
        "https://linkedin.com/in/omawchar",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
