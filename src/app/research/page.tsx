import type { Metadata } from "next";
import ResearchClient from "./ResearchClient";

const BASE = "https://omavchar.space";

export const metadata: Metadata = {
  title: "Research Papers & Technical Studies | Om Avchar",
  description:
    "Technical research papers and studies by Om Avchar on Distributed Systems, GPU Orchestration, AI Serving Infrastructure (vLLM, Triton, Quantization), RAG optimization, and Nginx Load Balancing.",
  keywords: [
    "Om Avchar research",
    "Distributed Systems CAP theorem",
    "GPU Orchestration vLLM",
    "RAG systems chunking",
    "Nginx load balancing consistent hashing",
    "Systems papers annotations",
  ],
  alternates: {
    canonical: `${BASE}/research`,
  },
  openGraph: {
    title: "Research Papers & Technical Studies | Om Avchar",
    description:
      "Technical research papers and studies by Om Avchar on Distributed Systems, GPU Orchestration, AI Serving Infrastructure (vLLM, Triton, Quantization), RAG optimization, and Nginx Load Balancing.",
    url: `${BASE}/research`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Research by Om Avchar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Papers & Technical Studies | Om Avchar",
    description:
      "Technical research papers by Om Avchar on Distributed Systems, AI Serving, RAG optimization, and Nginx Load Balancing.",
    images: ["/og-image.png"],
  },
};

export default function ResearchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Research Papers by Om Avchar",
    "description": "Selected research and studies on distributed systems and AI infrastructure.",
    "itemListElement": [
      {
        "@type": "ScholarlyArticle",
        "position": 1,
        "headline": "Distributed Systems & CAP Theorem",
        "description": "An in-depth study of the CAP theorem, consistency models (eventual, strong, causal), and database trade-offs.",
        "author": {
          "@type": "Person",
          "name": "Om Avchar"
        }
      },
      {
        "@type": "ScholarlyArticle",
        "position": 2,
        "headline": "AI Infrastructure at Scale",
        "description": "Research into GPU orchestration, model quantization, continuous batching, and low-latency LLM serving pipelines.",
        "author": {
          "@type": "Person",
          "name": "Om Avchar"
        }
      },
      {
        "@type": "ScholarlyArticle",
        "position": 3,
        "headline": "RAG Systems Deep Dive",
        "description": "Evaluation of Naive vs Advanced RAG patterns, semantic chunking, hybrid search, and cross-encoder re-ranking.",
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
      <ResearchClient />
    </>
  );
}
