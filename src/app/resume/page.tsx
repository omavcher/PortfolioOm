import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

const BASE = "https://omavchar.space";

export const metadata: Metadata = {
  title: "Resume — Om Avchar | Backend Engineer",
  description:
    "Download and view Om Avchar's resume — Backend Engineer and System Design Expert based in Nagpur, India. Experience with Node.js, Redis, Kafka, MongoDB, AWS, Next.js, and AI pipelines.",
  keywords: [
    "Om Avchar resume",
    "Om Avchar CV",
    "Backend Engineer resume India",
    "Node.js developer resume",
    "System Design Engineer CV",
    "Software Engineer resume Nagpur",
    "download Om Avchar resume",
  ],
  alternates: {
    canonical: `${BASE}/resume`,
  },
  openGraph: {
    title: "Resume — Om Avchar | Backend Engineer",
    description:
      "Om Avchar's resume — Backend Engineering, System Design, AI Pipelines. Node.js, Redis, Kafka, MongoDB, AWS. Nagpur, India.",
    url: `${BASE}/resume`,
    type: "profile",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Om Avchar Resume" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume — Om Avchar | Backend Engineer",
    description: "Backend Engineering resume — Node.js, Redis, Kafka, AI Pipelines. Nagpur, India.",
    images: ["/og-image.png"],
  },
};

export default function ResumePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Om Avchar",
    url: BASE,
    jobTitle: "Backend Engineer",
    description:
      "Backend Engineer specialising in System Design, Node.js, Redis, Kafka, and AI Pipelines.",
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "C++ & Data Structures Certification",
        credentialCategory: "certificate",
        recognizedBy: { "@type": "Organization", name: "Internship Studio" },
      },
    ],
    knowsAbout: [
      "Node.js", "Redis", "Kafka", "MongoDB", "PostgreSQL",
      "AWS", "Docker", "Next.js", "System Design", "Microservices",
    ],
    sameAs: [
      "https://github.com/omavcher",
      "https://linkedin.com/in/omawchar",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResumeClient />
    </>
  );
}
