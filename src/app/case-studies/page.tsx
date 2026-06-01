import type { Metadata } from "next";
import CaseStudiesClient from "./CaseStudiesClient";

const BASE = "https://omavchar.space";

export const metadata: Metadata = {
  title: "Case Studies | Om Avchar",
  description:
    "In-depth case studies and strategic breakdowns, including Repowering the Revolution: The Ola Electric Renaissance — a blueprint for rebuilding trust and scaling sustainable mobility in India.",
  keywords: [
    "Om Avchar case studies",
    "Ola Electric case study",
    "Ola Electric Renaissance Omega",
    "The Big Brand Theory case study",
    "Sustainable mobility India",
    "EV strategy blueprint India",
  ],
  alternates: {
    canonical: `${BASE}/case-studies`,
  },
  openGraph: {
    title: "Case Studies | Om Avchar",
    description:
      "In-depth case studies and strategic breakdowns, featuring Repowering the Revolution: The Ola Electric Renaissance.",
    url: `${BASE}/case-studies`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Case Studies by Om Avchar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Om Avchar",
    description:
      "In-depth case studies and strategic blueprints, featuring Repowering the Revolution: The Ola Electric Renaissance.",
    images: ["/og-image.png"],
  },
};

export default function CaseStudiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Case Studies by Om Avchar",
    "description": "Selected business and systems architecture case studies.",
    "itemListElement": [
      {
        "@type": "Article",
        "position": 1,
        "headline": "Repowering the Revolution: The Ola Electric Renaissance",
        "description": "A Strategic Blueprint for Rebuilding Trust and Scaling Sustainable Mobility.",
        "author": {
          "@type": "Person",
          "name": "Om Avchar"
        }
      }
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudiesClient />
    </>
  );
}
