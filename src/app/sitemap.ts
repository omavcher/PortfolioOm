import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

import { RESEARCH } from "@/app/research/data";
import { CASE_STUDIES } from "@/app/case-studies/data";

const BASE = "https://omavchar.space";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE}/research`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/case-studies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE}/resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  // ── Blog posts — dynamic from MDX ─────────────────────────────────────────
  const blogs = getAllPosts("blogs");
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${BASE}/blogs/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ── Research papers — dynamic from data array ──────────────────────────────
  const researchRoutes: MetadataRoute.Sitemap = RESEARCH.map((paper) => ({
    url: `${BASE}/research/${paper.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Case studies — dynamic from data array ──────────────────────────────────
  const caseStudyRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${BASE}/case-studies/${cs.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...researchRoutes, ...caseStudyRoutes];
}
