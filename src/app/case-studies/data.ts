export interface CaseStudyHighlight {
  title: string;
  content: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  pdfUrl: string;
  cover: string;
  category: string;
  teamName: string;
  teamMembers: string[];
  year: string;
  accent: string;
  highlights: CaseStudyHighlight[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "ola-electric-renaissance",
    title: "Repowering the Revolution: The Ola Electric Renaissance",
    subtitle: "A Strategic Blueprint for Rebuilding Trust and Scaling Sustainable Mobility",
    category: "THE BIG BRAND THEORY",
    teamName: "Omega",
    teamMembers: ["OM ACHER"],
    cover: "/case-study/preencoded.png",
    pdfUrl: "/case-study/Repowering-the-Revolution-The-Ola-Electric-Renaissance.pdf",
    accent: "#10b981", // Ola Sustainable Mobility Green
    year: "2026",
    tags: [
      "Electric Vehicles",
      "Brand Strategy",
      "Sustainable Mobility",
      "Operations Management",
      "Customer Trust"
    ],
    desc:
      "Ola Electric entered India's market with extraordinary ambition — to accelerate the nation's electric mobility transition and build a globally competitive EV brand. The vision was bold, the timing was right, and the early momentum was real. Yet today, a widening gap has emerged between what Ola promised and what customers actually experience. This disconnect — rooted in product quality failures, severe after-sales service gaps, and intensifying competition — has eroded market share and damaged brand equity. Our mission is clear: reposition Ola Electric as India's most reliable, aspirational, and scalable EV ecosystem by fundamentally rebuilding trust, achieving operational service excellence, driving meaningful innovation, and restoring long-term profitability.",
    highlights: [
      {
        title: "The Original Promise",
        content:
          "Ola Electric launched with a bold ambition: to accelerate India's electric mobility transition and establish a globally competitive EV brand that would redefine sustainable transportation for millions of Indian consumers."
      },
      {
        title: "The Core Issue",
        content:
          "Product quality concerns, severe after-sales service gaps, and rising competition have deeply impacted market share. The brand's promise and the customer experience have diverged in ways that require immediate, structural correction."
      },
      {
        title: "The Current Reality",
        content:
          "Despite early momentum and a futuristic vision, friction has grown between the brand's promise and the actual customer experience. Quality concerns, service failures, and rising competition have deeply impacted market share."
      },
      {
        title: "The Strategic Objective",
        content:
          "Our goal is to successfully reposition Ola Electric as India's most reliable, aspirational, and scalable EV ecosystem. We will achieve this by fundamentally improving trust, operational service excellence, meaningful innovation, and long-term viability."
      }
    ]
  }
];
