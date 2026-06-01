import { Metadata } from "next";
import HomeClient from "./HomeClient";

const BASE = "https://omavchar.space";

export const metadata: Metadata = {
  title: "Om Avchar — Backend Engineer & System Design Expert",
  description:
    "Portfolio of Om Avchar — a Backend Engineer from Nagpur, India specialising in System Design, Node.js, Redis, Kafka, AI Pipelines, and scalable microservices. Built HeartEcho (550K+ users). Open to internships & collaborations.",
  keywords: [
    "Om Avchar portfolio",
    "Om Avchar",
    "Om Awchar",
    "Backend Developer Nagpur",
    "Backend Engineer India",
    "System Design Expert India",
    "Node.js Developer India",
    "Full Stack Developer Nagpur",
    "AI Engineer India",
    "Redis Expert",
    "Apache Kafka Developer",
    "MongoDB Developer",
    "Next.js Developer India",
    "Software Engineer Portfolio 2026",
    "HeartEcho developer",
    "PaperXify developer",
    "GWCET engineer",
    "omavchar.space",
    "microservices architect India",
    "backend architecture portfolio",
    "NIT Rourkela AIR 11",
    "ET-AI Hackathon semi-finalist",
  ],
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: "Om Avchar — Backend Engineer & System Design Expert",
    description:
      "Backend engineering portfolio — System Design, Node.js, Redis, Kafka, AI Pipelines. Built HeartEcho (550K+ users). Based in Nagpur, India.",
    url: BASE,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Om Avchar Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Avchar — Backend Engineer & System Design Expert",
    description: "Backend engineering portfolio — Node.js, Redis, Kafka, AI. Built HeartEcho (550K users). Nagpur, India.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Om Avchar",
    alternateName: "Om Awchar",
    url: BASE,
    image: `${BASE}/my.avif`,
    jobTitle: "Backend Engineer",
    description:
      "Backend Engineer and System Design Expert from Nagpur, India. Specialises in Node.js, Redis, Kafka, AI Pipelines, and high-concurrency microservices.",
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
    knowsAbout: [
      "System Design",
      "Backend Engineering",
      "Microservices Architecture",
      "Node.js",
      "Apache Kafka",
      "Redis",
      "MongoDB",
      "PostgreSQL",
      "Artificial Intelligence",
      "Machine Learning",
      "Data Structures and Algorithms",
      "Next.js",
      "AWS",
      "Docker",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Backend Software Engineer",
      occupationLocation: {
        "@type": "City",
        name: "Nagpur, Maharashtra, India",
      },
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Om Avchar — Portfolio",
    url: BASE,
    description:
      "Portfolio of Om Avchar — Backend Engineer and System Design Expert from Nagpur, India.",
    author: {
      "@type": "Person",
      name: "Om Avchar",
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeClient />
    </>
  );
}