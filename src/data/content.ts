/**
 * Content Configuration for Angel Mariya's Portfolio
 * Edit this file to customize personal info, headlines, projects, skills, and links.
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  metrics?: string;
  category: "AI & ML" | "Full Stack" | "System / Utility";
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  highlights: string[];
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level?: string }[];
}

export interface PortfolioContent {
  personal: {
    name: string;
    signatureLogo: string;
    role: string;
    college: string;
    location: string;
    academicYear: string;
    status: string;
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
    resumeUrl: string;
  };
  hero: {
    headline: string[];
    metaRow: string;
    ctaPrimary: { text: string; href: string };
    ctaSecondary: { text: string; href: string };
  };
  about: {
    title: string;
    bioParagraphs: string[];
    quickStats: { label: string; value: string }[];
    skills: SkillCategory[];
    education: EducationItem[];
  };
  works: {
    title: string;
    subtitle: string;
    projects: Project[];
  };
  game: {
    title: string;
    subtitle: string;
    description: string;
    badge: string;
  };
  contact: {
    title: string;
    subtitle: string;
    emailPrompt: string;
    responseTime: string;
    locationText: string;
  };
}

export const portfolioContent: PortfolioContent = {
  personal: {
    name: "Angel Mariya",
    signatureLogo: "Angel",
    role: "Computer Science & AI Engineering Student",
    college: "Thejus Engineering College",
    location: "Kerala, India",
    academicYear: "3rd Year",
    status: "OPEN TO INTERNSHIPS",
    email: "angelmariya.cse@gmail.com",
    github: "https://github.com/angelmariya",
    linkedin: "https://linkedin.com/in/angelmariya",
    resumeUrl: "#contact",
  },

  hero: {
    headline: [
      "I build intelligent,",
      "user-friendly software,",
      "turning ideas in AI and web",
      "into projects that solve real problems.",
    ],
    metaRow:
      "CS & AI ENGINEERING STUDENT • 3RD YEAR • KERALA, INDIA • OPEN TO INTERNSHIPS",
    ctaPrimary: {
      text: "View Works",
      href: "#works",
    },
    ctaSecondary: {
      text: "Get in Touch",
      href: "#contact",
    },
  },

  about: {
    title: "About Me",
    bioParagraphs: [
      "I am an undergraduate engineering student specializing in Computer Science & Artificial Intelligence at Thejus Engineering College in Kerala, India. Driven by curiosity about how intelligent systems can simplify human lives, I combine rigorous theoretical foundations with modern full-stack web engineering.",
      "My work revolves around machine learning pipelines, natural language processing, and high-performance interactive web interfaces. I enjoy writing clean, semantic code, exploring state-of-the-art AI architectures, and turning challenging problem statements into intuitive, accessible digital experiences.",
      "When I am not training models or polishing UI interactions, you can find me participating in hackathons, contributing to student developer communities, and reading about emerging AI breakthroughs.",
    ],
    quickStats: [
      { label: "Focus", value: "AI + Full Stack" },
      { label: "Degree", value: "B.Tech CSE (AI)" },
      { label: "University", value: "APJ Abdul Kalam TU" },
      { label: "Status", value: "Available 2026/2027" },
    ],
    skills: [
      {
        name: "Artificial Intelligence & ML",
        skills: [
          { name: "Python" },
          { name: "PyTorch" },
          { name: "TensorFlow" },
          { name: "Scikit-Learn" },
          { name: "OpenCV" },
          { name: "Hugging Face" },
          { name: "NLP & LLMs" },
          { name: "Data Analysis (Pandas/NumPy)" },
        ],
      },
      {
        name: "Web & Frontend",
        skills: [
          { name: "React" },
          { name: "Next.js (App Router)" },
          { name: "TypeScript" },
          { name: "Tailwind CSS" },
          { name: "JavaScript (ES6+)" },
          { name: "Framer Motion" },
          { name: "HTML5 / CSS3" },
        ],
      },
      {
        name: "Backend, Databases & Tools",
        skills: [
          { name: "Node.js" },
          { name: "FastAPI / Flask" },
          { name: "SQL (PostgreSQL / MySQL)" },
          { name: "MongoDB" },
          { name: "Git & GitHub" },
          { name: "Docker" },
          { name: "REST APIs" },
          { name: "Linux" },
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Technology in Computer Science Engineering (Artificial Intelligence)",
        institution: "Thejus Engineering College, APJ Abdul Kalam Technological University",
        location: "Vellarakkad, Thrissur, Kerala, India",
        period: "2023 - 2027 (Expected)",
        grade: "First Class with Distinction (Current)",
        highlights: [
          "Specialized coursework: Machine Learning, Artificial Intelligence, Data Structures & Algorithms, Database Systems, Computer Networks.",
          "Active participant in technical symposiums, hackathons, and university coding contests.",
          "Lead student coordinator for AI & machine learning workshop series.",
        ],
      },
      {
        degree: "Higher Secondary Education (Computer Science & Science Stream)",
        institution: "Kerala State Higher Secondary Examination Board",
        location: "Kerala, India",
        period: "2021 - 2023",
        grade: "Distinction (95%+)",
        highlights: [
          "Core subjects: Computer Science, Mathematics, Physics, and Chemistry.",
          "Developed foundational passion for algorithm design and Python programming.",
        ],
      },
    ],
  },

  works: {
    title: "Selected Works",
    subtitle:
      "Curated engineering projects spanning intelligent vision systems, NLP toolkits, and modern full-stack web applications.",
    projects: [
      {
        id: "neuro-vision",
        title: "NeuroVision AI",
        tagline: "Explainable Medical Image Classification",
        description:
          "An end-to-end deep learning framework designed to assist clinicians in classifying chest X-rays with Grad-CAM visual heatmaps for explainable diagnostic transparency.",
        tags: ["PyTorch", "Python", "FastAPI", "Next.js", "OpenCV"],
        metrics: "94.2% Validation Accuracy",
        category: "AI & ML",
        githubUrl: "https://github.com/angelmariya/neurovision-ai",
        liveUrl: "https://neurovision-ai-demo.vercel.app",
        featured: true,
      },
      {
        id: "malayalam-nlp",
        title: "Synthetix Indic NLP",
        tagline: "Multilingual Low-Resource Text Transformer",
        description:
          "A fine-tuned transformer pipeline for multilingual sentiment analysis and text summarization focusing on Malayalam and Indian regional dialects.",
        tags: ["Hugging Face", "Transformers", "PyTorch", "Flask", "TypeScript"],
        metrics: "88 BLEU Score on Test Corpus",
        category: "AI & ML",
        githubUrl: "https://github.com/angelmariya/synthetix-nlp",
        liveUrl: "https://synthetix-nlp.vercel.app",
        featured: true,
      },
      {
        id: "campus-flow",
        title: "CampusFlow Portal",
        tagline: "Smart Academic Scheduler & Student Knowledge Base",
        description:
          "A centralized campus management system with an AI query bot that automates timetable conflict resolution and delivers instantaneous academic announcements.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
        metrics: "1,200+ Active Student Queries",
        category: "Full Stack",
        githubUrl: "https://github.com/angelmariya/campusflow",
        liveUrl: "https://campusflow.vercel.app",
        featured: true,
      },
      {
        id: "aura-lens",
        title: "Aura Minimalist Commerce",
        tagline: "AI-Powered Aesthetic Headless Storefront",
        description:
          "High-performance editorial e-commerce platform incorporating vector-similarity visual recommendations, instant search, and sleek micro-animations.",
        tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Stripe API"],
        metrics: "99+ Lighthouse Score",
        category: "Full Stack",
        githubUrl: "https://github.com/angelmariya/aura-commerce",
        liveUrl: "https://aura-store-demo.vercel.app",
        featured: false,
      },
    ],
  },

  game: {
    title: "Retro Pixel Snake",
    subtitle: "A classic arcade break powered by pure TypeScript & HTML5 Canvas.",
    description:
      "Take a minute to unwind. Control the pixel snake using Arrow Keys or on-screen touch buttons. Collect green energy blocks and beat your personal high score!",
    badge: "ARCADE MODE",
  },

  contact: {
    title: "Let's Build Something Meaningful",
    subtitle:
      "I am currently looking for engineering internships, technical collaborations, and research opportunities in AI and full-stack development.",
    emailPrompt: "Say hello directly",
    responseTime: "Typically replies within 24 hours",
    locationText: "Thrissur, Kerala, India (UTC+05:30)",
  },
};

