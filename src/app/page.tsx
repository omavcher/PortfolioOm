import { Metadata } from "next";
import HomeClient from "./HomeClient";

const BASE = "https://omavchar.space";

export const metadata: Metadata = {
  title: "Om Avchar — Backend Engineer & System Design Expert",
  description:
    "Portfolio of Om Avchar — a Backend Engineer from Nagpur, India specialising in System Design, Node.js, Redis, Kafka, AI Pipelines, and scalable microservices. Built HeartEcho (550K+ users). Open to internships & collaborations.",
  keywords: [
    "Om Avchar portfolio",
    "Om Avchar",
    "Om Awchar",
    "Backend Developer Nagpur",
    "Backend Engineer India",
    "System Design Expert India",
    "Node.js Developer India",
    "Full Stack Developer Nagpur",
    "AI Engineer India",
    "Redis Expert",
    "Apache Kafka Developer",
    "MongoDB Developer",
    "Next.js Developer India",
    "Software Engineer Portfolio 2026",
    "TryOff AI developer",
    "TryOff AI Outfit Try On",
    "HeartEcho developer",
    "PocketMind developer",
    "PaperXify developer",
    "GWCET engineer",
    "omavchar.space",
    "microservices architect India",
    "backend architecture portfolio",
    "NIT Rourkela AIR 11",
    "ET-AI Hackathon semi-finalist",
    "LeetCode Om Avchar",
    "LeetCode omavcher",
    "omavcher leetcode stats",
    "Competitive Programming Nagpur",
    "Data Structures and Algorithms Nagpur",
  ],
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: "Om Avchar — Backend Engineer & System Design Expert",
    description:
      "Backend engineering portfolio — System Design, Node.js, Redis, Kafka, AI Pipelines. Built HeartEcho (550K+ users). Based in Nagpur, India.",
    url: BASE,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Om Avchar Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Avchar — Backend Engineer & System Design Expert",
    description: "Backend engineering portfolio — Node.js, Redis, Kafka, AI. Built HeartEcho (550K users). Nagpur, India.",
    images: ["/og-image.png"],
  },
};

const LEETCODE_USERNAME = "omavcher";

const BACKUP_DATA = {
  allQuestionsCount: [
    { difficulty: "All", count: 3962 },
    { difficulty: "Easy", count: 950 },
    { difficulty: "Medium", count: 2069 },
    { difficulty: "Hard", count: 943 }
  ],
  matchedUser: {
    username: LEETCODE_USERNAME,
    problemsSolvedBeatsStats: [
      { difficulty: "Easy", percentage: 86.09 },
      { difficulty: "Medium", percentage: 74.39 },
      { difficulty: "Hard", percentage: 62.96 }
    ],
    submitStatsGlobal: {
      acSubmissionNum: [
        { difficulty: "All", count: 140, submissions: 191 },
        { difficulty: "Easy", count: 79, submissions: 105 },
        { difficulty: "Medium", count: 51, submissions: 73 },
        { difficulty: "Hard", count: 10, submissions: 13 }
      ],
      totalSubmissionNum: [
        { difficulty: "All", count: 147, submissions: 294 },
        { difficulty: "Easy", count: 80, submissions: 146 },
        { difficulty: "Medium", count: 55, submissions: 112 },
        { difficulty: "Hard", count: 12, submissions: 36 }
      ]
    },
    userCalendar: {
      activeYears: [2025, 2026],
      streak: 43,
      totalActiveDays: 111,
      dccBadges: [],
      submissionCalendar: "{\"1768348800\": 2, \"1768521600\": 2, \"1768608000\": 1, \"1768780800\": 2, \"1768953600\": 1, \"1769040000\": 2, \"1769126400\": 2, \"1769212800\": 1, \"1769299200\": 8, \"1769385600\": 1, \"1769472000\": 1, \"1769644800\": 1, \"1769817600\": 1, \"1771977600\": 2, \"1773878400\": 1, \"1773964800\": 1, \"1774051200\": 1, \"1774137600\": 8, \"1774742400\": 2, \"1775174400\": 1, \"1775260800\": 7, \"1775347200\": 11, \"1775865600\": 1, \"1776470400\": 4, \"1776556800\": 3, \"1776729600\": 1, \"1776816000\": 4, \"1776902400\": 1, \"1776988800\": 1, \"1777075200\": 1, \"1777161600\": 1, \"1777248000\": 2, \"1777420800\": 1, \"1777593600\": 1, \"1777939200\": 2, \"1778025600\": 3, \"1778112000\": 1, \"1778198400\": 4, \"1778284800\": 3, \"1778371200\": 1, \"1778457600\": 1, \"1778544000\": 1, \"1778630400\": 2, \"1778716800\": 3, \"1778803200\": 5, \"1778889600\": 2, \"1778976000\": 8, \"1779062400\": 1, \"1779148800\": 3, \"1779235200\": 2, \"1779321600\": 5, \"1779408000\": 1, \"1779494400\": 3, \"1779580800\": 4, \"1779667200\": 1, \"1779753600\": 1, \"1779840000\": 1, \"1779926400\": 1, \"1780012800\": 4, \"1780099200\": 1, \"1780185600\": 1, \"1780272000\": 1, \"1780358400\": 3, \"1780444800\": 2, \"1780531200\": 2, \"1780617600\": 2, \"1780704000\": 2, \"1780790400\": 4, \"1780876800\": 3, \"1780963200\": 1, \"1781049600\": 4, \"1781136000\": 1, \"1781222400\": 6, \"1781308800\": 5, \"1781395200\": 2, \"1781481600\": 4, \"1781568000\": 3, \"1750204800\": 5, \"1750291200\": 11, \"1750377600\": 8, \"1750464000\": 1, \"1750550400\": 5, \"1750636800\": 1, \"1750723200\": 2, \"1750809600\": 13, \"1750896000\": 4, \"1750982400\": 2, \"1751068800\": 2, \"1751155200\": 2, \"1751241600\": 1, \"1751328000\": 1, \"1751414400\": 1, \"1751500800\": 1, \"1751673600\": 2, \"1751760000\": 1, \"1751846400\": 2, \"1751932800\": 1, \"1752105600\": 1, \"1752278400\": 3, \"1752364800\": 1, \"1752451200\": 1, \"1752537600\": 2, \"1752624000\": 2, \"1752796800\": 1, \"1752883200\": 1, \"1753142400\": 3, \"1753574400\": 1, \"1753833600\": 1, \"1754870400\": 2, \"1763683200\": 3, \"1763856000\": 2}"
    }
  }
};

const GQL_QUERY = `
query getUserProfile($username: String!) {
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: $username) {
    username
    problemsSolvedBeatsStats {
      difficulty
      percentage
    }
    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    userCalendar {
      activeYears
      streak
      totalActiveDays
      submissionCalendar
    }
  }
}
`;

async function getLeetCodeData() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Referer": "https://leetcode.com/"
      },
      body: JSON.stringify({
        query: GQL_QUERY,
        variables: { username: LEETCODE_USERNAME }
      }),
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error();
    const json = await res.json();
    if (json.errors || !json.data || !json.data.matchedUser) throw new Error();
    return json.data;
  } catch (e) {
    console.warn("Failed to fetch live LeetCode data server-side, using backup data.");
    return BACKUP_DATA;
  }
}

export default async function Page() {
  const leetcodeData = await getLeetCodeData();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Om Avchar",
    alternateName: "Om Awchar",
    url: BASE,
    image: `${BASE}/my.avif`,
    jobTitle: "Backend Engineer",
    description:
      "Backend Engineer and System Design Expert from Nagpur, India. Specialises in Node.js, Redis, Kafka, AI Pipelines, and high-concurrency microservices.",
    email: "omavchar@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: [
      "https://github.com/omavcher",
      "https://linkedin.com/in/omawchar",
      "https://leetcode.com/u/omavcher/",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "G H Raisoni College of Engineering (GWCET)",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nagpur",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
    knowsAbout: [
      "System Design",
      "Backend Engineering",
      "Microservices Architecture",
      "Node.js",
      "Apache Kafka",
      "Redis",
      "MongoDB",
      "PostgreSQL",
      "Artificial Intelligence",
      "Machine Learning",
      "Data Structures and Algorithms",
      "Next.js",
      "AWS",
      "Docker",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Backend Software Engineer",
      occupationLocation: {
        "@type": "City",
        name: "Nagpur, Maharashtra, India",
      },
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Om Avchar — Portfolio",
    url: BASE,
    description:
      "Portfolio of Om Avchar — Backend Engineer and System Design Expert from Nagpur, India.",
    author: {
      "@type": "Person",
      name: "Om Avchar",
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeClient initialLeetcodeData={leetcodeData} />
    </>
  );
}