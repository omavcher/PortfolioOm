import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import type { Metadata } from "next";

const BASE = "https://omavchar.space";

export async function generateStaticParams() {
  const posts = getAllPosts("blogs");
  return posts.map((p) => ({ slug: p.slug }));
}

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: PageParams
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("blogs", slug);
  if (!post) return {};

  const title = `${post.title} | Om Avchar's Blog`;
  const description = post.excerpt || "Technical blog by Om Avchar";
  const ogUrl = `${BASE}/blogs/${slug}`;
  const ogImage = post.cover ? `${BASE}${post.cover}` : `${BASE}/og-image.png`;

  return {
    title,
    description,
    keywords: post.tags || [],
    alternates: {
      canonical: ogUrl,
    },
    openGraph: {
      title,
      description,
      url: ogUrl,
      type: "article",
      publishedTime: post.date,
      authors: [`${BASE}/about`],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage(
  { params }: PageParams
) {
  const { slug } = await params;
  const post = getPostBySlug("blogs", slug);
  if (!post) notFound();

  const ogImage = post.cover ? `${BASE}${post.cover}` : `${BASE}/og-image.png`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || "",
    "datePublished": post.date,
    "image": ogImage,
    "url": `${BASE}/blogs/${slug}`,
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
      "@id": `${BASE}/blogs/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
