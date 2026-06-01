import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

const BASE = "https://omavchar.space";

export const metadata: Metadata = {
  title: "Projects | Om Avchar — Scaled Systems & AI Apps",
  description:
    "Explore the systems built by Om Avchar: HeartEcho (AI Companion Platform scaled to 550k+ users), PaperXify (YouTube note generator), and Autonomous Social Content Engine.",
  keywords: [
    "Om Avchar projects",
    "HeartEcho AI",
    "PaperXify",
    "AI Companion Platform backend",
    "Node.js scaled systems",
    "Redis caching systems",
    "Nginx sticky sessions",
    "Kafka event driven architecture",
  ],
  alternates: {
    canonical: `${BASE}/projects`,
  },
  openGraph: {
    title: "Projects | Om Avchar — Scaled Systems & AI Apps",
    description:
      "Explore the systems built by Om Avchar: HeartEcho (AI Companion Platform scaled to 550k+ users), PaperXify (YouTube note generator), and Autonomous Social Content Engine.",
    url: `${BASE}/projects`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Projects by Om Avchar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Om Avchar — Scaled Systems & AI Apps",
    description:
      "Explore the systems built by Om Avchar: HeartEcho (AI Companion Platform scaled to 550k+ users), PaperXify (YouTube note generator), and Autonomous Social Content Engine.",
    images: ["/og-image.png"],
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Projects by Om Avchar",
    "description": "Selected projects and systems designed and built by Om Avchar.",
    "itemListElement": [
      {
        "@type": "SoftwareApplication",
        "position": 1,
        "name": "HeartEcho",
        "description": "AI companion platform scaled to 550k+ users with custom priority queues, Redis caching, and real-time WebSockets.",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "All",
      },
      {
        "@type": "SoftwareApplication",
        "position": 2,
        "name": "PaperXify",
        "description": "AI-powered tool that summarizes 8-hour YouTube lectures into PDF notes in under 8 seconds using parallel LLM chunking.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All",
      },
      {
        "@type": "SoftwareApplication",
        "position": 3,
        "name": "Social Manager",
        "description": "Autonomous trend monitoring, content generation, and publishing engine powered by AI agents and Kafka event bus.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsClient />
    </>
  );
}
