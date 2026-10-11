/**
 * Career Trail & Expedition Waypoints Configuration
 * Updated directly from LinkedIn Resume Profile & Verified Certifications:
 * - Google Generative AI Leader Certification (May 2026)
 * - Google Cloud Technical Series - AI Agents edition (Aug 2025)
 * - Google Associate Cloud Engineer Certification (Apr 2025)
 * - Microsoft Certified: Azure Solutions Architect Expert (Aug 2021)
 * - Microsoft Certified: Azure Fundamentals (Jun 2020)
 * - Harvard CS50x (Dec 2021)
 * - Educative Become a Node.js Developer (Aug 2021)
 * - Coursera Introduction to Generative AI
 * - Flutter Development Bootcamp with Dart (Jul 2020)
 */

export const certificationsList = [
  {
    name: "Generative AI Leader Certification",
    issuer: "Google",
    date: "May 2026",
    badge: "Google Cloud",
    category: "AI & GenAI",
    skills: "Generative AI",
    color: "#4285F4"
  },
  {
    name: "Cloud Technical Series - AI Agents edition",
    issuer: "Google",
    date: "Aug 2025",
    badge: "Google Cloud",
    category: "AI & GenAI",
    credentialId: "526e7556-f9ad-4791-a151-127455a2690d",
    color: "#4285F4"
  },
  {
    name: "Associate Cloud Engineer Certification",
    issuer: "Google",
    date: "Apr 2025",
    badge: "Google Cloud",
    category: "Cloud",
    color: "#4285F4"
  },
  {
    name: "Introduction to Generative AI",
    issuer: "Coursera",
    date: "2024",
    badge: "Coursera",
    category: "AI & GenAI",
    credentialId: "C5JTBE384H8W",
    color: "#0056D2"
  },
  {
    name: "Microsoft Certified: Azure Solutions Architect Expert",
    issuer: "Microsoft",
    date: "Aug 2021",
    badge: "Azure Expert",
    category: "Cloud Architecture",
    color: "#0089D6"
  },
  {
    name: "CS50x: Introduction to Computer Science",
    issuer: "Harvard / CS50",
    date: "Dec 2021",
    badge: "Harvard",
    category: "Computer Science",
    color: "#A51C30"
  },
  {
    name: "Become a Node.js Developer",
    issuer: "Educative",
    date: "Aug 2021",
    badge: "Node.js",
    category: "Backend",
    credentialId: "585DM2txZ6jmb97J9f44k0Z6LMNVcq",
    color: "#339933"
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    date: "Jun 2020",
    badge: "Azure",
    category: "Cloud",
    color: "#0089D6"
  },
  {
    name: "The Complete Flutter Development Bootcamp with Dart",
    issuer: "Udemy",
    date: "Jul 2020",
    badge: "Flutter",
    category: "Mobile",
    color: "#02569B"
  }
];

export const careerTrail = [
  {
    id: "base-camp",
    type: "role",
    waypointNumber: "01",
    label: "START (BASE CAMP)",
    tagline: "01: START (BASE CAMP)",
    role: "Software Engineer → Senior Software Engineer",
    company: "Amazech & Zaloni",
    period: "2011 — 2015",
    location: "Bengaluru & Guwahati, India",
    coordinates: "12.9716° N, 77.5946° E",
    elevation: "1,200m",
    elevationNum: 1200,
    status: "completed",
    summary: "Base camp foundations & Big Data engineering — building custom CMS engines, migrating enterprise portals, and crafting data lake query builders.",
    highlights: [
      "Zaloni: Enhanced 'Bedrock' Big Data lake management with interactive Hive Query Builder and Lineage Visualization",
      "Amazech: Built custom eCommerce CMS, Zen Cart integrations, and social engagement systems (PHP, MySQL)",
      "Implemented SQL-like Expression Builder and designed tailored Kibana reports for deep data insights"
    ],
    equipment: ["JavaScript", "AngularJS", "PHP", "MySQL", "Hive", "Kibana"],
    metrics: {
      reliability: "99.5%",
      terrain: "Full-Stack & Big Data",
      equipment: "AngularJS, PHP, Big Data"
    },
    actionLinks: [
      { label: "View Early Projects", url: "#projects" }
    ]
  },
  {
    id: "early-route",
    type: "role",
    waypointNumber: "02",
    label: "EARLY ROUTE (WAYPOINT)",
    tagline: "02: EARLY ROUTE (WAYPOINT)",
    role: "Technical Lead (Founding UI Engineer)",
    company: "Kogentix (acquired by Accenture)",
    period: "2015 — 2018",
    location: "Hyderabad, Telangana, India",
    coordinates: "17.3850° N, 78.4867° E",
    elevation: "2,100m",
    elevationNum: 2100,
    status: "completed",
    summary: "Founding UI Engineer shaping company growth and architecting the core AMP platform for creating, monitoring, and deploying AI applications.",
    highlights: [
      "Led development of the AMP platform, enabling creation, management, monitoring, and deployment of AI applications (AngularJS, D3.js, jsPlumb, Chart.js)",
      "Developed metadata governance platforms for the world's largest consumer intelligence company",
      "Led a team of five developers integrating complex APIs and data lakes for retail market measurement"
    ],
    equipment: ["AngularJS", "D3.js", "jsPlumb", "ExtJS", "Chart.js", "REST APIs"],
    metrics: {
      reliability: "99.8%",
      terrain: "AI Platforms & Data Governance",
      equipment: "AngularJS, D3.js, AI AMP"
    }
  },
  {
    id: "camp-1-sre",
    type: "role",
    waypointNumber: "03",
    label: "CAMP 1 (SRE FOCUS)",
    tagline: "03: CAMP 1 (SRE FOCUS)",
    role: "Associate Manager",
    company: "Accenture",
    period: "2018 — 2022",
    location: "Hyderabad Area, India",
    coordinates: "17.3850° N, 78.4867° E",
    elevation: "3,000m",
    elevationNum: 3000,
    status: "completed",
    summary: "Engineering leadership & platform scale — guiding team transitions to Node.js microservices and directing analytics architectures.",
    highlights: [
      "Mentored a team of six Java engineers transitioning to Node.js microservices for South Africa's largest Telecom company (Restify, Docker, Redis, Kibana, Grafana)",
      "Directed five developers building talent identification analytics for Malaysia's largest Oil & Gas company using Azure, TypeScript, SQL, and Databricks",
      "Led development of an enterprise employee loyalty platform using Express, MySQL, and React"
    ],
    equipment: ["Node.js", "Docker", "Azure Services", "TypeScript", "React", "Redis", "Grafana"],
    certifications: [
      {
        name: "Azure Solutions Architect Expert",
        issuer: "Microsoft",
        date: "Aug 2021",
        badge: "Azure Expert"
      },
      {
        name: "Azure Fundamentals",
        issuer: "Microsoft",
        date: "Jun 2020",
        badge: "Azure"
      },
      {
        name: "CS50x: Computer Science",
        issuer: "Harvard / CS50",
        date: "Dec 2021",
        badge: "Harvard"
      },
      {
        name: "Become a Node.js Developer",
        issuer: "Educative",
        date: "Aug 2021",
        badge: "Node.js"
      }
    ],
    metrics: {
      reliability: "99.9%",
      terrain: "Telecom Microservices & Cloud",
      equipment: "Docker, Node.js, Azure"
    }
  },
  {
    id: "dbs-singapore",
    type: "role",
    waypointNumber: "04",
    label: "DBS SINGAPORE (THE ASCENT)",
    tagline: "04: DBS SINGAPORE (THE ASCENT)",
    role: "Senior SRE and DevOps",
    company: "DBS Bank",
    period: "2022 — Present",
    location: "Singapore",
    coordinates: "1.3521° N, 103.8198° E",
    elevation: "3,900m",
    elevationNum: 3900,
    status: "current",
    summary: "Senior Site Reliability Engineer maintaining mission-critical banking platforms, automated CI/CD pipelines, and high-altitude enterprise resiliency.",
    highlights: [
      "Oversee system reliability, performance, and multi-region failover across Tier-1 enterprise banking services",
      "Deploy efficient CI/CD deployment pipelines using Jenkins and OpenShift for smooth operations",
      "Align large-scale tech projects with business goals for enhanced operational agility and resilience"
    ],
    equipment: ["Jenkins", "OpenShift", "Kubernetes", "DevOps", "Python", "Prometheus", "Grafana"],
    metrics: {
      reliability: "99.99%",
      terrain: "Enterprise Banking Infrastructure",
      equipment: "OpenShift, Jenkins, SRE"
    },
    sparkline: [40, 55, 65, 75, 88, 92, 99.99],
    actionLinks: [
      { label: "Inspect Tech Stack", type: "inspect" },
      { label: "View Singapore SRE Project", url: "#projects" }
    ]
  },
  {
    id: "ai-mapping",
    type: "expedition",
    waypointNumber: "05",
    label: "AI & EXPLORATION (WAYPOINT)",
    tagline: "05: AI & EXPLORATION (WAYPOINT)",
    role: "AI Engineering & GPU Infrastructure",
    company: "DBS Bank & Frontier Initiatives",
    period: "2023 — Present",
    location: "Singapore",
    coordinates: "1.3521° N, 103.8198° E",
    elevation: "4,700m",
    elevationNum: 4700,
    status: "active",
    summary: "Frontier AI engineering — enabling high-performance GPU orchestration with Run.ai and deploying Large Language Models (LLMs) for enterprise banking.",
    highlights: [
      "Working on AI engineering using large language models (LLMs)",
      "Enabled high-performance GPU infrastructure for the AI engineering team using Run.ai",
      "Freelance: Architected healthcare Prior Authorization Checkpoint SaaS with computer vision OCR"
    ],
    equipment: ["Run.ai", "LLMs", "GPU Clusters", "Python", "React", "Docker", "OCR"],
    certifications: [
      {
        name: "Generative AI Leader",
        issuer: "Google",
        date: "May 2026",
        badge: "Google Cloud"
      },
      {
        name: "AI Agents Edition",
        issuer: "Google Cloud",
        date: "Aug 2025",
        badge: "Google Cloud"
      },
      {
        name: "Associate Cloud Engineer",
        issuer: "Google",
        date: "Apr 2025",
        badge: "Google Cloud"
      },
      {
        name: "Intro to Generative AI",
        issuer: "Coursera",
        date: "2024",
        badge: "Coursera"
      }
    ],
    metrics: {
      reliability: "99.95%",
      terrain: "AI Engineering & GPU Infra",
      equipment: "Run.ai, LLMs, GPUs"
    }
  },
  {
    id: "summit",
    type: "summit",
    waypointNumber: "06",
    label: "THE SUMMIT (FUTURE HORIZONS)",
    tagline: "06: THE SUMMIT (FUTURE HORIZONS)",
    role: "Principal Explorer & Architect",
    company: "Global Horizons",
    period: "Next Frontier",
    location: "The Wild",
    coordinates: "Global",
    elevation: "5,300m",
    elevationNum: 5300,
    status: "upcoming",
    summary: "Reaching the summit — autonomous agentic architectures, planetary-scale distributed systems, and wilderness trail exploration across the globe.",
    highlights: [
      "Autonomous systems, edge computing, and planetary-scale infrastructure",
      "High-altitude outdoor trail endurance & wilderness mountaineering",
      "Mentoring the next generation of full-stack and reliability engineers"
    ],
    equipment: ["Autonomous AI", "Distributed Systems", "Planetary Cloud", "Alpine Gear"],
    metrics: {
      reliability: "99.999%",
      terrain: "Planetary Scale",
      equipment: "Autonomous AI, Cloud"
    }
  }
];
