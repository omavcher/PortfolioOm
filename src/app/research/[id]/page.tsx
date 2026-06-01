import { notFound } from "next/navigation";
import ResearchDetailClient from "./ResearchDetailClient";
import { RESEARCH } from "../data";
import type { Metadata } from "next";

const BASE = "https://omavchar.space";

export function generateStaticParams() {
  return RESEARCH.map((r) => ({ id: r.id }));
}

interface PageParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: PageParams
): Promise<Metadata> {
  const { id } = await params;
  const paper = RESEARCH.find((r) => r.id === id);
  if (!paper) return {};

  const title = `${paper.title} | Research | Om Avchar`;
  const description = paper.abstract || paper.desc || "Research paper by Om Avchar";
  const ogUrl = `${BASE}/research/${id}`;
  const ogImage = paper.cover ? `${BASE}${paper.cover}` : `${BASE}/og-image.png`;

  return {
    title,
    description,
    keywords: paper.tags || [],
    alternates: {
      canonical: ogUrl,
    },
    openGraph: {
      title,
      description,
      url: ogUrl,
      type: "article",
      authors: [`${BASE}/about`],
      images: [{ url: ogImage, width: 1200, height: 630, alt: paper.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ResearchDetailPage(
  { params }: PageParams
) {
  const { id } = await params;
  const paper = RESEARCH.find((r) => r.id === id);
  if (!paper) notFound();

  const ogImage = paper.cover ? `${BASE}${paper.cover}` : `${BASE}/og-image.png`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": paper.title,
    "alternativeHeadline": paper.subtitle,
    "description": paper.abstract || paper.desc || "",
    "datePublished": `${paper.year}-01-01`,
    "image": ogImage,
    "url": `${BASE}/research/${id}`,
    "author": {
      "@type": "Person",
      "name": "Om Avchar",
      "url": BASE,
    },
    "publisher": {
      "@type": "Person",
      "name": "Om Avchar",
      "url": BASE,
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE}/research/${id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResearchDetailClient paper={paper} />
    </>
  );
}
