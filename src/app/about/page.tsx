import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const BASE = "https://omavchar.space";

export const metadata: Metadata = {
  title: "About Om Avchar — Backend Engineer from Nagpur, India",
  description:
    "Learn about Om Avchar — a Backend Engineer and System Design Expert from Nagpur, India. Built HeartEcho (9,000+ users), ranked AIR 11 at NIT Rourkela, ET-AI Hackathon semi-finalist. Expert in Node.js, Redis, Kafka, and AI.",
  keywords: [
    "Om Avchar biography",
    "Om Avchar about",
    "Backend Engineer from Nagpur",
    "System Design Expert India",
    "HeartEcho creator",
    "AIR 11 NIT Rourkela",
    "ET-AI Hackathon",
    "GWCET Nagpur engineer",
    "Node.js expert India",
  ],
  alternates: {
    canonical: `${BASE}/about`,
  },
  openGraph: {
    title: "About Om Avchar — Backend Engineer from Nagpur, India",
    description:
      "Om Avchar — Backend Engineer, System Designer, AI builder. Built HeartEcho (9,000+ users). AIR 11 NIT Rourkela. Based in Nagpur, India.",
    url: `${BASE}/about`,
    type: "profile",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Om Avchar — About" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Om Avchar — Backend Engineer from Nagpur",
    description: "Backend Engineer, System Designer, AI builder. HeartEcho (9,000+ users). AIR 11 NIT Rourkela.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Om Avchar",
      alternateName: "Om Awchar",
      url: BASE,
      image: `${BASE}/my.avif`,
      jobTitle: "Backend Engineer",
      description:
        "Backend Engineer and System Design Expert from Nagpur, India. Specialises in Node.js, Redis, Kafka, AI Pipelines, and scalable microservices.",
      email: "omavchar@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nagpur",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      sameAs: [
        "https://github.com/omavcher",
        "https://linkedin.com/in/omawchar",
        "https://leetcode.com/u/omavcher/",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "G H Raisoni College of Engineering (GWCET)",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nagpur",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
