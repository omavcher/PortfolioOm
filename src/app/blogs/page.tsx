import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import BlogsClient from "./BlogsClient";

const BASE = "https://omavchar.space";

export const metadata: Metadata = {
  title: "Blogs | Technical Articles & Tutorials — Om Avchar",
  description:
    "Read technical deep dives, tutorials, and articles on Node.js, Redis performance caching, system design patterns, and AI application costs vs human developers by Om Avchar.",
  keywords: [
    "Om Avchar blogs",
    "System Design blog",
    "Node.js tutorials",
    "Redis guide",
    "AI employment cost vs human developers",
    "Backend engineering articles",
  ],
  alternates: {
    canonical: `${BASE}/blogs`,
  },
  openGraph: {
    title: "Blogs | Technical Articles & Tutorials — Om Avchar",
    description:
      "Read technical deep dives, tutorials, and articles on Node.js, Redis, System Design, and AI application costs by Om Avchar.",
    url: `${BASE}/blogs`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Blogs by Om Avchar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Technical Articles & Tutorials — Om Avchar",
    description:
      "Read technical deep dives, tutorials, and articles on Node.js, Redis, System Design, and AI application costs by Om Avchar.",
    images: ["/og-image.png"],
  },
};

export default function BlogsPage() {
  const posts = getAllPosts("blogs");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Om Avchar's Engineering Blog",
    "description": "Technical articles, guides, and engineering logs by Om Avchar.",
    "url": `${BASE}/blogs`,
    "author": {
      "@type": "Person",
      "name": "Om Avchar",
    },
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || "",
      "datePublished": post.date,
      "image": post.cover ? `${BASE}${post.cover}` : `${BASE}/og-image.png`,
      "url": `${BASE}/blogs/${post.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogsClient posts={posts} />
    </>
  );
}
