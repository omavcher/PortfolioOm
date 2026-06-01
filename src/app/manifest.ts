import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Om Avchar — Portfolio",
    short_name: "Om Avchar",
    description:
      "Backend Engineer & System Design Expert. Node.js, Redis, Kafka, AI Pipelines. Based in Nagpur, India.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf7",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
