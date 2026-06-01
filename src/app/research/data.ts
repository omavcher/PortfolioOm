// Shared research data — imported by both the listing page and detail page.
// This is a plain module (no "use client") so it works in server components.

export interface Author {
  name: string;
  role: string;
  affiliation: string;
  email: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  cover: string;
  accent: string;
  year: string;
  status: string;
  pdfUrl: string;
  presentationUrl: string;
  abstract: string;
  outcomes: string[];
  keyFindings: { label: string; val: string }[];
  faq: { q: string; a: string }[];
  authors?: Author[];
  linkedinEmbedUrl?: string;
  fullPaper?: {
    introduction: string[];
    literatureReview: { title: string; content: string[] }[];
    proposedConcept: { title: string; content: string[] }[];
    conclusion: string[];
    references: string[];
  };
}

export const RESEARCH: ResearchPaper[] = [
  {
    id: "papertube-review",
    title: "A REVIEW PAPER ON PAPERTUB YOUTUBE VIDEO LINK TO NOTES MAKER",
    subtitle: "Presented at ICRTSET-2026 · CS & Engineering",
    desc: "An AI-powered automated learning system that transforms educational video URLs into structured, visual, and interactive Socratic study guides.",
    tags: [
      "Artificial Intelligence",
      "Large Language Models",
      "Natural Language Processing",
      "Educational Technology",
      "Automatic Text Summarization",
      "MENN Stack"
    ],
    cover: "/research/papertube-cover.png",
    accent: "#2563eb",
    year: "2026",
    status: "Presented",
    pdfUrl: "/research/papertube-review-papertube.pdf",
    presentationUrl: "https://www.linkedin.com/posts/omavchar_innovation-ai-icrtset2026-activity-7449741427384745984-Dp6m",
    linkedinEmbedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7449741427384745984",
    abstract:
      "The rapid growth of video-based learning platforms such as YouTube has transformed modern education by providing students with easy access to lectures, tutorials, and academic resources. However, this shift has introduced a significant challenge known as the Information Capture Gap, where students struggle to convert long video lectures into structured and concise study materials. Traditional note-taking methods require frequent pausing, rewinding, and manual transcription, which disrupts cognitive flow and reduces learning efficiency. This research proposes PaperTube, an AI-powered automated learning system designed to transform educational video URLs into structured and visually enhanced study notes. The system is developed using the MENN stack and integrates multiple artificial intelligence models to automate the process of lecture analysis and knowledge extraction. The platform utilizes Google Gemini for abstractive text summarization, Whisper-based speech-to-text processing for generating transcripts from audio streams, and Hugging Face models to create context-aware visual diagrams that support visual learning. Additionally, the system integrates a LLaMA-powered conversational module that enables students to interact with the generated notes through a Socratic question-answering interface. Unlike traditional transcription tools that produce unstructured text, PaperTube focuses on generating hierarchical, timestamped, and aesthetically formatted PDF study notes that mirror the way students naturally organize information while studying. The system also incorporates cloud synchronization using the Google Drive API to allow seamless storage and retrieval of generated notes. Experimental comparisons with manual note-taking methods demonstrate that the proposed system significantly reduces the time required to generate study material while improving organization, accessibility, and knowledge retention. By combining artificial intelligence, natural language processing, and modern web technologies, PaperTube provides a scalable solution for transforming passive video consumption into an active and efficient learning experience.",
    outcomes: [
      "Designed a multi-model AI pipeline that converts educational video URLs into visually enhanced notes.",
      "Integrated Google Gemini for abstractive text summarization, resolving the Information Capture Gap.",
      "Implemented Whisper-based speech-to-text to automatically generate high-accuracy transcripts.",
      "Built a LLaMA-powered conversational module enabling an interactive Socratic learning environment.",
      "Enabled cloud synchronization with the Google Drive API for seamless storage and accessibility."
    ],
    keyFindings: [
      { label: "Summarization Accuracy", val: "High" },
      { label: "Generation Speed", val: "Under 8s" },
      { label: "Student Time Saved", val: "Up to 80%" }
    ],
    faq: [
      {
        q: "What is the Information Capture Gap?",
        a: "The Information Capture Gap refers to the cognitive and physical friction students face when manually converting long, continuous video lectures into structured, visual study notes—frequently needing to pause, rewind, and rewrite, which interrupts active learning."
      },
      {
        q: "How does PaperTube differ from raw transcription tools?",
        a: "Unlike simple speech-to-text tools that spit out raw, unstructured blocks of text, PaperTube organizes notes hierarchically, formats them aesthetically as a PDF, injects AI-generated diagrams, and hosts an interactive Q&A assistant to clarify concepts."
      },
      {
        q: "What AI models power the PaperTube system?",
        a: "PaperTube uses Whisper for robust speech-to-text transcription, Google Gemini for semantic analysis and abstractive summarization, Hugging Face models for context-aware visual diagrams, and LLaMA for the interactive question-answering chatbot."
      }
    ],
    authors: [
      {
        name: "Prof. Shital Zalke",
        role: "Assistant Professor",
        affiliation: "CSE Department, Govindrao Wanjari College of Engineering & Technology, Nagpur",
        email: "shitalzalke03@gmail.com"
      },
      {
        name: "Om Avcher",
        role: "Student",
        affiliation: "CSE Department, Govindrao Wanjari College of Engineering & Technology, Nagpur",
        email: "omawchar07@gmail.com"
      },
      {
        name: "Gulshan Sahu",
        role: "Student",
        affiliation: "CSE Department, Govindrao Wanjari College of Engineering & Technology, Nagpur",
        email: "gulshan6242@gmail.com"
      },
      {
        name: "Prajwal Charthad",
        role: "Student",
        affiliation: "CSE Department, Govindrao Wanjari College of Engineering & Technology, Nagpur",
        email: "prajwalcharthad11@gmail.com"
      },
      {
        name: "Sakshi Taksande",
        role: "Student",
        affiliation: "CSE Department, Govindrao Wanjari College of Engineering & Technology, Nagpur",
        email: "sakshitaksande46@gmail.com"
      },
      {
        name: "Chetan Balki",
        role: "Student",
        affiliation: "CSE Department, Govindrao Wanjari College of Engineering & Technology, Nagpur",
        email: "chetanbalki00@gmail.com"
      }
    ],
    fullPaper: {
      introduction: [
        "In recent years, the rapid advancement of digital technology has significantly transformed the landscape of modern education. Online learning platforms, particularly video-based platforms such as YouTube, have become one of the most widely used sources for acquiring academic knowledge. Millions of students across the world rely on video lectures, tutorials, and recorded classes to understand complex subjects ranging from programming and engineering to mathematics and science. The accessibility, affordability, and diversity of educational content available on these platforms have made them an essential part of modern learning environments.",
        "Despite the availability of high-quality video lectures, students often face challenges when converting this continuous stream of information into structured and usable study material. Watching long video lectures typically requires students to frequently pause, rewind, and manually write notes in order to capture key concepts. This process is time-consuming and often interrupts the cognitive flow of learning. As a result, students may miss important points or end up with poorly organized notes that are difficult to review later. This problem can be described as the “Information Capture Gap,” where valuable information delivered through video content is not efficiently converted into structured learning resources.",
        "Traditional note-taking approaches depend heavily on the student’s ability to quickly identify key ideas and organize them effectively while watching a lecture. However, this manual process can lead to information overload, reduced attention span, and inefficient learning outcomes. Furthermore, many existing tools only provide basic transcription services that generate raw text from video audio. While transcripts can be useful, they often lack structure, summarization, visual aids, and contextual explanations, making them less effective as study material.",
        "To bridge this gap, there is a growing need for an automated system that leverages Artificial Intelligence (AI) and Natural Language Processing (NLP) to synthesize video content into comprehensive study guides. Such a system would go beyond mere transcription by identifying the underlying hierarchical structure of a lecture, generating concise summaries, and extracting visual cues such as diagrams or slides. By integrating these advanced technologies, the learning process shifts from a passive viewing experience to an active, resource-rich engagement. This transformation not only saves time but also ensures that the resulting material is tailored for long-term retention and quick revision, effectively solving the \"Information Capture Gap\" and empowering students to focus on mastery rather than just documentation.",
        "To address these challenges, this research proposes PaperTube, an AI-powered platform designed to automatically transform educational video content into structured and visually enhanced study notes. The system leverages advancements in Artificial Intelligence (AI), Natural Language Processing (NLP), and Large Language Models (LLMs) to analyze lecture content and extract meaningful insights. Instead of producing simple transcripts, PaperTube generates organized, hierarchical, and visually supported notes that help students understand and review complex topics more effectively.",
        "Another unique feature of the proposed system is the integration of an interactive conversational AI module powered by LLaMA, which allows students to ask questions related to the generated notes. This transforms static study material into an interactive learning environment where students can clarify doubts and deepen their understanding of the subject matter.",
        "The primary objective of this research is to bridge the gap between passive video consumption and active academic learning. By automating the process of lecture analysis, summarization, and note generation, PaperTube aims to significantly reduce the time and effort required for students to create effective study materials. The system ultimately provides a smarter and more efficient approach to learning from video-based educational resources."
      ],
      literatureReview: [
        {
          title: "2.1. AUTOMATIC TEXT SUMMARIZATION (ATS)",
          content: [
            "Automatic Text Summarization (ATS) is a crucial research area within the fields of Natural Language Processing (NLP) and Artificial Intelligence. The primary objective of ATS is to condense large volumes of textual information into shorter, meaningful summaries while preserving the essential ideas and context of the original content. With the exponential growth of digital information, particularly in the form of online articles, research papers, and educational videos, ATS has become an essential technology for efficiently processing and understanding large datasets.",
            "Traditional summarization methods were primarily based on extractive summarization, where the system selects the most important sentences directly from the original text using statistical and linguistic techniques. These methods typically rely on features such as word frequency, sentence position, and keyword importance to determine which parts of the text are most relevant. Although extractive summarization preserves factual accuracy by using sentences from the source content, it often produces summaries that lack coherence and natural flow because the sentences are not rewritten or reorganized.",
            "Recent advancements in Artificial Intelligence have introduced abstractive summarization, which aims to generate summaries in a manner similar to human writing. Instead of simply selecting existing sentences, abstractive models analyze the meaning of the text and generate new sentences that capture the core ideas in a concise and understandable form. This approach significantly improves readability and allows the system to reorganize information logically. Modern Large Language Models (LLMs), such as Google Gemini, GPT-based models, and other transformer-based architectures, have demonstrated strong performance in generating high-quality abstractive summaries."
          ]
        },
        {
          title: "2.2. Visual Learning and AI",
          content: [
            "Visual learning plays an important role in improving comprehension and knowledge retention in modern education. Cognitive science research, particularly Dual Coding Theory, suggests that individuals learn more effectively when information is presented through both textual and visual formats. When concepts are explained using diagrams, charts, or illustrations alongside textual explanations, the brain is able to process and store information more efficiently. As a result, visual representations are widely used in educational materials to simplify complex ideas and improve understanding.",
            "In traditional learning environments, students often rely on textbooks or handwritten notes that include diagrams and visual aids. However, when learning from video lectures, students may find it difficult to recreate these visuals while simultaneously listening to the lecture and taking notes. This limitation can reduce the effectiveness of video-based learning, as many technical subjects such as computer science, engineering, and mathematics require visual representations to clearly explain abstract concepts.",
            "Recent advancements in Artificial Intelligence have enabled the automatic generation of visual content that complements textual explanations. AI-based image generation models and visual processing tools can analyze textual descriptions and create relevant diagrams or illustrations that help learners better understand the subject matter. These technologies are increasingly being used in educational platforms to enhance the quality of digital learning materials."
          ]
        }
      ],
      proposedConcept: [
        {
          title: "3.1. Data Acquisition Layer",
          content: [
            "This layer serves as the entry point. The system uses the Google YouTube Data API to securely fetch video metadata and caption tracks. If captions are unavailable, the system reroutes the audio stream to a Speech-to-Text (STT) model like Whisper to generate a raw transcript."
          ]
        },
        {
          title: "3.2. AI Analysis & Summarization Engine",
          content: [
            "The core intelligence is powered by Google’s Gemini AI. It performs a deep semantic analysis to identify key definitions, core concepts, and chronological milestones. Instead of a simple summary, the engine reorganizes content into a logical hierarchy using headings and bullet points."
          ]
        },
        {
          title: "3.3. Interactive Engagement Module",
          content: [
            "To transform static notes into an active learning environment, the system integrates a LLaMA-powered conversational AI. This allows students to engage in a Socratic dialogue, asking clarifying questions directly about the generated content."
          ]
        }
      ],
      conclusion: [
        "The rapid transition toward video-based learning on platforms like YouTube has introduced an \"Information Capture Gap,\" where students struggle to convert continuous video streams into structured study materials. This review paper surveys the current limitations of passive video consumption and existing automated transcription tools. To bridge this gap, this paper proposes the conceptual framework for \"PaperTube,\" an automated intelligence architecture. Rather than detailing a deployed application, this study outlines a theoretical multi-model AI pipeline designed to transform educational URLs into aesthetic, timestamped PDF notes. The proposed methodology explores the integration of Google Gemini for abstractive summarization, Hugging Face for context-aware visual generation, and LLaMA for interactive Socratic tutoring. Ultimately, this survey addresses the shortcomings of current manual note-taking methods and offers a theoretical, scalable model for active academic synthesis."
      ],
      references: [
        "Vaswani, A., et al., (2017) \"Attention Is All You Need\", Advances in Neural Information Processing Systems, Vol. 30, pp. 5998–6008.",
        "Brown, T. B., et al., (2020) \"Language Models are Few-Shot Learners\", OpenAI Technical Reports, Vol. 33, No. 1, pp. 1-15.",
        "Shneiderman, B., (2010) Designing the User Interface: Strategies for Effective Human-Computer Interaction, 5th Edition, Addison-Wesley.",
        "S. Bhowmik and S. S. Prasad, (2022) \"Automated Note-Taking and Summarization System for Online Education Using Natural Language Processing\", International Journal of Computer Science and Engineering, Vol. 9, Issue 12, pp. 309-315.",
        "World Economic Forum, (2023) \"The Future of Jobs Report 2023: The Impact of AI on Education\", WEF Industry Whitepapers.",
        "Pressman, R. S., (2019) Software Engineering: A Practitioner's Approach, 9th Edition, McGraw-Hill Education.",
        "Flanagan, D., (2020) JavaScript: The Definitive Guide, 7th Edition, O'Reilly Media.",
        "Silberschatz, A., Korth, H. F., & Sudarshan, S., (2019) Database System Concepts, 7th Edition, McGraw-Hill.",
        "Coursera, (2024) \"Global Skills Report 2024: The Rise of Micro-learning\", Coursera Industry Reports.",
        "Google Cloud, \"Gemini API Documentation\", Available: https://ai.google.dev/docs. [Accessed: Feb. 2026].",
        "Meta AI, \"LLaMA 3 Model Card and User Guide\", Available: https://llama.meta.com/docs/. [Accessed: Feb. 2026].",
        "Next.js Documentation, \"App Router and Server Components\", Available: https://nextjs.org/docs. [Accessed: Feb. 2026].",
        "MongoDB Inc., \"Aggregation Framework and Data Modeling\", Available: https://www.mongodb.com/docs/manual/. [Accessed: Feb. 2026].",
        "YouTube Data API v3, \"Reference Guide for Captions and Metadata\", Available: https://developers.google.com/youtube/v3/docs. [Accessed: Feb. 2026].",
        "OpenAI, \"Whisper: Robust Speech Recognition via Large-Scale Weak Supervision\", Available: https://github.com/openai/whisper. [Accessed: Feb. 2026]."
      ]
    }
  }
];
