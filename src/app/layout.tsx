import type { Metadata } from "next";
import { Geist, Geist_Mono, Architects_Daughter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SecurityGuard from "@/components/SecurityGuard";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const handwriting = Architects_Daughter({ weight: "400", variable: "--font-handwriting-font", subsets: ["latin"] });

const BASE_URL = "https://omavchar.space";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    template: "%s | Om Avchar",
    default: "Om Avchar — Backend Engineer & System Design Expert",
  },
  description:
    "Portfolio of Om Avchar — a Backend Engineer from Nagpur, India specialising in System Design, Node.js, Redis, Kafka, AI Pipelines, and high-concurrency microservices. Open to internships and collaborations.",

  keywords: [
    "Om Avchar",
    "Om Awchar",
    "omavchar",
    "Backend Developer India",
    "Backend Engineer Nagpur",
    "System Design Engineer",
    "Node.js Developer India",
    "Full Stack Developer",
    "AI Engineer India",
    "Redis Expert",
    "Kafka Developer",
    "MongoDB Developer",
    "Next.js Developer",
    "Software Engineer Portfolio",
    "GWCET student",
    "HeartEcho",
    "PaperXify",
    "omavchar.space",
    "microservices India",
    "backend architecture",
  ],

  authors: [{ name: "Om Avchar", url: BASE_URL }],
  creator: "Om Avchar",
  publisher: "Om Avchar",

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Om Avchar — Portfolio",
    title: "Om Avchar — Backend Engineer & System Design Expert",
    description:
      "Backend engineering portfolio of Om Avchar — System Design, Node.js, Redis, Kafka, AI pipelines, and high-concurrency microservices. Based in Nagpur, India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Om Avchar — Backend Engineer & System Design Expert",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@omavchar",
    creator: "@omavchar",
    title: "Om Avchar — Backend Engineer & System Design Expert",
    description:
      "Backend engineering portfolio — System Design, Node.js, Redis, Kafka, AI Pipelines. Based in Nagpur, India.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
  },

  manifest: "/manifest.json",

  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="light" />
        <link rel="me" href="https://github.com/omavchar" />
        <link rel="me" href="https://linkedin.com/in/omawchar" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${handwriting.variable} antialiased bg-[#f5f5f5] text-slate-900`}>
        {/* Paper Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-20 mix-blend-multiply z-[150] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>

        <SecurityGuard />
        <Navbar />
        <main className="relative min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}