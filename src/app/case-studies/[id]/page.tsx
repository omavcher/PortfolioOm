import { notFound } from "next/navigation";
import CaseStudyDetailClient from "./CaseStudyDetailClient";
import { CASE_STUDIES } from "../data";
import type { Metadata } from "next";

const BASE = "https://omavchar.space";

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ id: cs.id }));
}

interface PageParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: PageParams
): Promise<Metadata> {
  const { id } = await params;
  const cs = CASE_STUDIES.find((item) => item.id === id);
  if (!cs) return {};

  const title = `${cs.title} | Case Studies | Om Avchar`;
  const description = cs.desc || "Case study by Om Avchar";
  const ogUrl = `${BASE}/case-studies/${id}`;
  const ogImage = cs.cover ? `${BASE}${cs.cover}` : `${BASE}/og-image.png`;

  return {
    title,
    description,
    keywords: cs.tags || [],
    alternates: {
      canonical: ogUrl,
    },
    openGraph: {
      title,
      description,
      url: ogUrl,
      type: "article",
      authors: [`${BASE}/about`],
      images: [{ url: ogImage, width: 1200, height: 630, alt: cs.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyDetailPage(
  { params }: PageParams
) {
  const { id } = await params;
  const cs = CASE_STUDIES.find((item) => item.id === id);
  if (!cs) notFound();

  const ogImage = cs.cover ? `${BASE}${cs.cover}` : `${BASE}/og-image.png`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": cs.title,
    "alternativeHeadline": cs.subtitle,
    "description": cs.desc || "",
    "datePublished": `${cs.year}-01-01`,
    "image": ogImage,
    "url": `${BASE}/case-studies/${id}`,
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
      "@id": `${BASE}/case-studies/${id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyDetailClient caseStudy={cs} />
    </>
  );
}
