import { Skill, Project, ExperienceItem, FreelanceProject } from '../types';

export const PERSONAL_INFO = {
  name: "SARAVANAN R A",
  fullName: "Saravanan R A",
  preTitle: "Full-Stack Developer & AWS Certified Engineer",
  tagline: "Systems thinking, applied everywhere.",
  aboutBrief: "B.Tech Information Technology student at Alpha College of Engineering & AWS Certified Engineer specializing in full-stack web applications and cloud architecture.",
  nextRole: "Full-Stack Developer & AWS Certified Solutions Architect",
  contact: {
    email: "sharan.26443p@gmail.com",
    phone: "+91 93455 38554",
    github: "https://github.com/sharan26443",
    githubUser: "sharan26443",
    linkedin: "https://linkedin.com/in/saravanan-ra",
    linkedinUser: "saravanan-ra",
    location: "Tamil Nadu, India"
  },
  stats: [
    { label: "Community Members Scaled", value: "1,600+" },
    { label: "AWS Cloud Certification", value: "AWS Certified" },
    { label: "Client Web Apps Built", value: "5 Live Platforms" },
    { label: "System Uptime Goal", value: "99.99%" }
  ]
};

export const FULL_BIO = {
  greeting: "Hi, I'm Saravanan R A.",
  college: "Alpha College of Engineering",
  degree: "B.Tech Information Technology",
  paragraphs: [
    "I am a software developer and B.Tech Information Technology student at Alpha College of Engineering with a passion for building functional, high-performance digital infrastructure.",
    "My core technical foundation bridges multiple languages—including Python, Java, C++, C, and HTML—allowing me to engineer everything from responsive front-end user interfaces to robust, secure back-end systems. Holding an AWS certification, I am heavily focused on cloud architecture and scalable software solutions.",
    "Whether I am developing a full-stack \"Smart Wallet\" application powered by a Python Flask backend and SQLite, or engineering direct-booking prototypes to save European hospitality businesses thousands of Euros in commission fees, my goal is always the same: writing clean code that solves real-world financial and operational problems."
  ]
};

export const SKILLS_DATA: Skill[] = [
  // Frontend & UI
  {
    name: "React",
    category: "Frontend & UI",
    level: 95,
    iconName: "Atom",
    description: "Building modern, component-driven Single Page Applications with dynamic state, hooks, and virtual DOM optimization.",
    highlight: "Custom hooks, Context API, state management & motion transitions"
  },
  {
    name: "HTML5",
    category: "Frontend & UI",
    level: 96,
    iconName: "Layout",
    description: "Semantic web architecture, accessible DOM structures, cross-browser layouts, and modern web APIs.",
    highlight: "WCAG 2.1 accessibility, semantic markup, web storage & forms"
  },

  // Languages
  {
    name: "Python",
    category: "Languages",
    level: 95,
    iconName: "Code2",
    description: "Primary backend & scripting language used for REST APIs, bot automation, and data pipelines.",
    highlight: "Asynchronous programming (asyncio), OOP, MVC architecture"
  },
  {
    name: "Java",
    category: "Languages",
    level: 88,
    iconName: "FileCode2",
    description: "Robust object-oriented programming for core software engineering principles and data structures.",
    highlight: "Multithreading, collection frameworks, enterprise patterns"
  },
  {
    name: "C++",
    category: "Languages",
    level: 85,
    iconName: "Cpu",
    description: "High-performance systems programming and algorithm optimization.",
    highlight: "Memory management, STL, algorithmic problem solving"
  },
  {
    name: "C",
    category: "Languages",
    level: 80,
    iconName: "Terminal",
    description: "Low-level system concepts, pointer arithmetic, and foundational computer architecture.",
    highlight: "Embedded logic, POSIX systems fundamentals"
  },
  {
    name: "JavaScript / TypeScript",
    category: "Languages",
    level: 92,
    iconName: "Braces",
    description: "Modern ES6+ frontend and Node.js full-stack development with strong type safety.",
    highlight: "React hooks, DOM performance, async/await streams"
  },
  {
    name: "SQL",
    category: "Languages",
    level: 90,
    iconName: "Database",
    description: "Relational database querying, schema modeling, joins, indexing, and query tuning.",
    highlight: "ACID transactions, relational normalization, CTEs"
  },

  // Cloud & DevOps
  {
    name: "AWS Cloud",
    category: "Cloud & DevOps",
    level: 92,
    iconName: "Cloud",
    description: "AWS Certified Solutions Engineer experienced in EC2, S3, Lambda, IAM, VPC, and CloudWatch.",
    highlight: "Certified Solutions Architect level architectural design"
  },
  {
    name: "Git & GitHub Actions",
    category: "Cloud & DevOps",
    level: 90,
    iconName: "GitBranch",
    description: "Version control workflows, automated CI/CD pipelines, and secret management.",
    highlight: "Branch protection, automated build & test workflows"
  },
  {
    name: "CI / CD Pipelines",
    category: "Cloud & DevOps",
    level: 88,
    iconName: "Workflow",
    description: "Automated testing, linting, packaging, and zero-downtime deployment pipelines.",
    highlight: "Automated deployment triggers & environment isolation"
  },
  {
    name: "Linux Systems",
    category: "Cloud & DevOps",
    level: 88,
    iconName: "Server",
    description: "Bash scripting, system administration, permission management, and service orchestration.",
    highlight: "SSH, systemd services, cron jobs, network diagnostics"
  },

  // Backend
  {
    name: "Flask",
    category: "Backend",
    level: 92,
    iconName: "Layers",
    description: "Lightweight Python microservices, RESTful endpoint design, and MVC web applications.",
    highlight: "Blueprints, Werkzeug security, SQLAlchemy ORM"
  },
  {
    name: "Django",
    category: "Backend",
    level: 85,
    iconName: "ShieldCheck",
    description: "Full-featured Python web framework with built-in admin, auth, and ORM layer.",
    highlight: "DRF (Django REST Framework), authentication middleware"
  },
  {
    name: "RESTful APIs",
    category: "Backend",
    level: 95,
    iconName: "Webhook",
    description: "Designing structured JSON API contracts, HTTP status standards, and rate limiting.",
    highlight: "Swagger/OpenAPI docs, token auth (JWT), CORS policies"
  },
  {
    name: "Microservices",
    category: "Backend",
    level: 86,
    iconName: "Boxes",
    description: "Decoupled component architectures with independent scaling and event-driven triggers.",
    highlight: "Loose coupling, message passing, service resilience"
  },

  // Databases
  {
    name: "SQLite",
    category: "Databases",
    level: 90,
    iconName: "HardDrive",
    description: "Embedded relational storage for desktop, mobile, and lightweight web backends.",
    highlight: "Custom WAL mode, transactional persistence"
  },
  {
    name: "MySQL",
    category: "Databases",
    level: 88,
    iconName: "DatabaseBackup",
    description: "Enterprise relational database management system with query execution planning.",
    highlight: "Index optimization, foreign key constraints, connection pooling"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "smart-wallet",
    title: "Smart Wallet",
    subtitle: "Full-Stack Personal Finance & Analytics Application",
    category: "Full-Stack Web App",
    description: "A comprehensive personal finance ecosystem built with Python Flask and SQLite, engineering an elegant Model-View-Controller (MVC) pattern to deliver real-time expense tracking, category breakdown, and secure transaction workflows.",
    highlights: [
      "Architected modular MVC pattern with robust input validation and Werkzeug security hash mechanisms.",
      "Designed relational SQLite schema with relational integrity constraints for accounts and transactions.",
      "Built real-time interactive visual budget allocation charts and dynamic spending velocity analytics.",
      "Implemented seamless CRUD workflows with zero page lock and crisp transactional rollback handling."
    ],
    techStack: ["Python", "Flask", "SQLite", "JavaScript", "Chart.js / SVG", "HTML5/CSS3"],
    githubUrl: "https://github.com/sharan26443",
    demoType: "wallet",
    stats: [
      { label: "Architecture", value: "MVC Pattern" },
      { label: "Response Time", value: "<45ms" },
      { label: "Data Safety", value: "Transactional" }
    ]
  },
  {
    id: "soulmate-hub",
    title: "The Soulmate Hub",
    subtitle: "High-Concurrency Automation & Community Infrastructure",
    category: "Automation & Async Systems",
    description: "Founded, engineered, and scaled a digital community platform to 1,600+ active members. Developed custom asynchronous Python automation bots to manage automated moderation, event scheduling, and member engagement telemetry.",
    highlights: [
      "Founded and scaled community infrastructure from 0 to 1,600+ active synchronized members.",
      "Developed custom Python bots utilizing asynchronous I/O (asyncio) for concurrent task handling.",
      "Engineered automated moderation filters, anti-spam heuristics, and scheduled event broadcasts.",
      "Created real-time telemetry logging to analyze peak activity windows and engagement metrics."
    ],
    techStack: ["Python", "Asyncio", "REST APIs", "Webhooks", "JSON Store", "Linux Daemon"],
    githubUrl: "https://github.com/sharan26443",
    demoType: "bot",
    stats: [
      { label: "Active Scale", value: "1,600+ Users" },
      { label: "Uptime", value: "99.9%" },
      { label: "Tasks / Min", value: "250+ Async" }
    ]
  },
  {
    id: "aws-cloud-pipeline",
    title: "AWS Cloud Infrastructure Pipeline",
    subtitle: "Serverless & Infrastructure-as-Code Deployment Architecture",
    category: "Cloud Engineering",
    description: "A production-grade cloud solution blueprint leveraging AWS serverless primitives, automated GitHub Actions CI/CD workflows, and CloudWatch telemetry for automated deployment of resilient microservices.",
    highlights: [
      "Designed secure AWS IAM policies following the principle of least privilege.",
      "Integrated automated GitHub Actions workflows for continuous build, lint, and AWS deployment.",
      "Utilized AWS Lambda, S3, and API Gateway for cost-optimized serverless execution.",
      "Configured CloudWatch alarm triggers and automated notification webhooks for health monitoring."
    ],
    techStack: ["AWS Lambda", "AWS S3", "API Gateway", "GitHub Actions", "IAM", "CloudWatch"],
    githubUrl: "https://github.com/sharan26443",
    demoType: "cloud",
    stats: [
      { label: "Cloud Standard", value: "AWS Certified" },
      { label: "Deployment", value: "Automated CI/CD" },
      { label: "Cost Efficiency", value: "Serverless Pay-Per-Use" }
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "aws-engineer",
    role: "AWS Certified Solutions Engineer",
    company: "Amazon Web Services (Certification)",
    period: "2024 - Present",
    badge: "Cloud Certified",
    description: "Validated expertise in designing cloud-native solutions, architecting multi-tier cloud infrastructures, and adhering to the AWS Well-Architected Framework.",
    achievements: [
      "Demonstrated mastery over AWS core infrastructure (EC2, S3, VPC, IAM, RDS, Route53, CloudFront).",
      "Applied strict security posture, high availability, and disaster recovery strategies across cloud workloads."
    ],
    skills: ["AWS EC2", "AWS Lambda", "IAM Security", "VPC Networking", "S3 Storage", "Cloud Architecture"]
  },
  {
    id: "btech-it",
    role: "B.Tech in Information Technology",
    company: "Engineering University Student",
    period: "Current Undergrad Student",
    badge: "Academic Foundation",
    description: "Pursuing Bachelor of Technology in Information Technology, focusing on core computer science fundamentals, data structures, algorithms, operating systems, and database management.",
    achievements: [
      "Consistent high academic standing with rigorous hands-on projects in software systems.",
      "Active leader in technical workshops, peer mentoring, and backend coding hackathons."
    ],
    skills: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks", "Software Engineering"]
  }
];

export const FREELANCE_PROJECTS_DATA: FreelanceProject[] = [
  {
    id: "pension-locarno",
    title: "Heritage Hotel & Restaurant",
    category: "Luxury Hospitality & Fine Dining",
    clientUrl: "https://pension-locarno.netlify.app/",
    description: "Bespoke, world-class digital storefront for a luxury coastal resort and 3-Michelin-Star dining destination on the Amalfi Coast. Blends high-contrast editorial aesthetics with fluid, instant booking engines to maximize direct guest conversions.",
    executiveSummary: "Designed and built for high-net-worth travelers, Heritage Hotel & Ristorante delivers a bespoke digital storefront for a luxury coastal resort and 3-Michelin-Star dining destination. The platform combines high-contrast editorial aesthetics with fluid, instant booking engines to eliminate OTA commission fees.",
    keyFeatures: [
      "Bespoke suite reservation & availability calendar",
      "Interactive Michelin 3-Star dining & menu showcases",
      "Table reservation system with custom seating selection",
      "Instant light/dark mode & multi-language support"
    ],
    featureSections: [
      {
        title: "🏛️ Brand Identity & Visual Architecture",
        items: [
          "Editorial Luxury Aesthetic: Deep navy canvasses, warm gold accents, and bespoke typography for a 5-star Mediterranean cliffside estate.",
          "Instant Light & Dark Mode: Seamless visual adaptation for day browsing or evening viewing.",
          "Flawless Responsive Layout: Fully optimized across all device viewports and mobile touch targets."
        ]
      },
      {
        title: "🏨 Hotel & Private Residences Showcase",
        items: [
          "Expansive Portfolio: Suites, Villas, Penthouses & Private Residences (Villa Bellissima with private cove & yacht mooring, Sommelier Terrace Suite, Palazzo Vista Mare).",
          "Category Filtering & Galleries: Square footage, bed specs, heated infinity pools, private helipads, and 24/7 butler service details.",
          "Smart Availability Bar: Hero search bar with custom date-range pickers and adult/children dropdown selectors."
        ]
      },
      {
        title: "🛎️ Seamless Room Reservation Engine",
        items: [
          "Multi-Step Guest Checkout: Intuitive room selection flow with live night & price calculations, transparent tax breakdowns, and guest preference fields.",
          "Instant Confirmation Pass: Generates an immediate digital booking voucher with a unique reservation ID and special concierge requests."
        ]
      },
      {
        title: "🍽️ Dedicated Michelin 3-Star Restaurant Hub",
        items: [
          "Standalone Restaurant Hub: Executive Chef Antoine Moreau's culinary philosophy, tasting menu highlights, and vineyard cellar details.",
          "Authentic Italian À La Carte Menu: Starters, Mains, Desserts, Cellar featuring signature Italian dishes (Tagliolini con Aragosta, Bistecca alla Fiorentina, Cupola d'Agrumi).",
          "Sommelier Pairings & Dietary Identifiers: Clear wine pairing recommendations, dietary tags (Gluten-Free, Vegetarian, Raw Seafood), and chef signature badges."
        ]
      },
      {
        title: "🍷 Interactive Table Reservation System",
        items: [
          "Custom Seating Selection: Reserve across Ocean Terrace Cliffside View, Main Michelin Salon, Chef Counter, or Private Sommelier Cellar.",
          "Time Slot Selection: Real-time availability slots for evening seatings with special dietary request fields.",
          "Instant Table Confirmation: Issues immediate table reservation codes without leaving the page."
        ]
      },
      {
        title: "✨ Premium Hospitality Features",
        items: [
          "Curated Amenities Showcase: Highlights thermal salt spas, private Riva boat charters, and helipad transfers.",
          "Direct VIP Concierge Channels: Built-in newsletter subscription and direct contact channels for bespoke holiday requests."
        ]
      }
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Direct Booking Engine", "Netlify"],
    previewTheme: "gold-resort",
    badge: "Freelance Project #1",
    thumbnailSeed: "heritage-hotel"
  },
  {
    id: "bolton-properties",
    title: "Bolton Properties",
    category: "Real Estate & Lettings Platform",
    clientUrl: "https://bolton-properties.netlify.app/",
    description: "Independent Sales & Lettings web application engineered for Farnworth and Bolton real estate market. Delivers instant multi-parameter property filters, split-panel media walkthroughs, saved portfolio drawers, and viewing appointment schedulers.",
    executiveSummary: "Custom real estate & lettings platform engineered for Farnworth and Bolton. Integrates multi-parameter search filters, split-panel media walkthroughs, saved portfolio collections, and direct 2-step viewing booking.",
    keyFeatures: [
      "Dynamic location, budget & bedroom filter engine",
      "Split-panel photo, floorplan & 3D spatial walkthrough viewer",
      "Interactive property portfolio & saved favorites drawer",
      "2-Step viewing appointment booking & lead capture"
    ],
    featureSections: [
      {
        title: "1. Bespoke Brand Aesthetic & Visual Identity",
        items: [
          "Editorial Design: Custom typography pairing and dark-mode aesthetic built specifically for Farnworth & Bolton real estate.",
          "High-Impact Hero Section: Prominently displays brand tagline ('Independent Sales and Lettings agents based in Farnworth, Bolton') alongside branch details."
        ]
      },
      {
        title: "2. Smart Property Search & Instant Filter Engine",
        items: [
          "Location & Street Filtering: Search by street or area (Plodder Lane, Capitol Close, Cobham Avenue, Farnworth, Bolton).",
          "Property Type & Budget Toggles: Filter easily between To Let (Lettings) and For Sale (Sales), with max budget and bedroom selectors."
        ]
      },
      {
        title: "3. Interactive Featured Property Showcase (Split-Panel)",
        items: [
          "Multi-Media Viewer: Switch between High-Res Photography, Architectural Floorplans, and 3D Spatial Walkthroughs.",
          "At-a-Glance Specs: Key metrics like Bedrooms, Bathrooms, Receptions, and Floor Area with direct tour booking CTA."
        ]
      },
      {
        title: "4. Complete Property Grid & Saved Portfolio",
        items: [
          "Dynamic Sorting: Sort listings by Price (High to Low / Low to High) or Square Footage.",
          "Saved Portfolio Drawer: Bookmark properties to a private collection and submit bulk viewing inquiries."
        ]
      },
      {
        title: "5. Detailed Property Dossier Modals",
        items: [
          "Full Gallery Slider: Interactive image viewer with thumbnail navigation.",
          "Specifications Table: Tenure, EPC Grade, Council Tax Band, Deposit requirements, and Chain Status with 1-click advisor contact."
        ]
      },
      {
        title: "6. 2-Step Viewing Booking & Lead Capture",
        items: [
          "Interactive Viewing Requests: Select preferred mode (In-Person Private Tour or Virtual Walkthrough), preferred dates, and times.",
          "Reference Code Generator: Automatically generates a unique booking reference code upon submission."
        ]
      },
      {
        title: "7. Valuation & Lettings Concierge Inquiry",
        items: [
          "Free Sales Valuations: Dedicated inquiry form for homeowners seeking a free sales valuation in Farnworth & Bolton.",
          "Landlord Lettings Management: Tailored forms for landlords seeking property management services."
        ]
      },
      {
        title: "8. Office Contact & Trust Integration",
        items: [
          "Branch Details: Office 7, 105, 107 Market St., Farnworth, Bolton BL4 7NS (01204 576666 | 0161 641 7788).",
          "Direct Links & Alerts: Direct email (sales@boltonproperties.co.uk) and property alert subscription digest."
        ]
      }
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Filter Engines", "Netlify"],
    previewTheme: "dark-luxury",
    badge: "Freelance Project #2",
    thumbnailSeed: "bolton-properties"
  },
  {
    id: "zum-lowen",
    title: "Zum Löwen — Hotel & Restaurant",
    category: "Historic Steakhouse & Lodging",
    clientUrl: "https://hotel-und-restaurant-rant-zum-lowen.netlify.app/",
    description: "Full-stack hospitality application created for a historic half-timbered hotel and gourmet steakhouse in Gelnhausen, Germany. Integrates table reservation forms, overnight room booking, German/English bilingual toggle, and Google reviews.",
    executiveSummary: "Full-stack hospitality application built for a historic half-timbered hotel and gourmet steakhouse in Gelnhausen, Germany. Integrates dual booking engines, math CAPTCHA security, dietary filters, and instant DE/GB bilingual translation.",
    keyFeatures: [
      "Dual booking engine for hotel rooms & restaurant tables",
      "Bilingual German (DE 🇩🇪) / English (GB 🇬🇧) language switcher",
      "Interactive menu with dry-aged steaks & dietary filters",
      "Embedded math CAPTCHA anti-spam security"
    ],
    featureSections: [
      {
        title: "1. 🗓️ Dual Online Booking Engine (Hotel Rooms + Restaurant Tables)",
        items: [
          "Hotel Room Reservation System: View room types, select dates/party sizes, real-time price calculations, instant PDF receipt generation & reference codes.",
          "Table Reservation Bar: Interactive table booking with Lunch/Dinner time slots and seating area selection (Historic Vault, Main Dining Room, Garden Terrace)."
        ]
      },
      {
        title: "2. 🛡️ Built-In Security & Anti-Spam (Interactive CAPTCHA)",
        items: [
          "Human verification math CAPTCHA integrated into both Table and Room booking forms to prevent automated spam."
        ]
      },
      {
        title: "3. 📅 Bespoke Responsive Date & Time Pickers",
        items: [
          "Custom calendar date picker tailored for German (15. Aug. 2026) and English formats with split Lunch & Dinner service hours."
        ]
      },
      {
        title: "4. 🍽️ Interactive Digital Menu & Dietary Filters",
        items: [
          "Food & beverage catalog covering Dry-Aged Steaks, Regional Hessian Specialties, Starters, Desserts, and Fine Wines.",
          "Quick dietary filter tags: Vegetarian 🌱, Gluten-Free 🌾, Chef Specialties ⭐ with clear allergen notes."
        ]
      },
      {
        title: "5. 🛏️ Hotel Accommodations Showcase",
        items: [
          "Detailed presentation of Deluxe Historic King, Classic Double, and Executive Suite with Sauna including amenities."
        ]
      },
      {
        title: "6. 🌐 Instant Bilingual Support (German 🇩🇪 & English 🇬🇧)",
        items: [
          "Seamless 1-click language switcher updating all text, forms, dates, and confirmation receipts between German and English."
        ]
      },
      {
        title: "7. 📍 Location, Storytelling & Customer Reviews",
        items: [
          "Our Story section celebrating house heritage, Google Reviews social proof (4.8 ★ rating with 500+ reviews), and interactive directions."
        ]
      }
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "i18n Logic", "Netlify"],
    previewTheme: "warm-hospitality",
    badge: "Freelance Project #3",
    thumbnailSeed: "zum-lowen"
  },
  {
    id: "gastehaus-am-forst",
    title: "Gästehaus am Forst",
    category: "Practical Lodging & Rates Engine",
    clientUrl: "https://gastehaus-am-forst.netlify.app/",
    description: "Custom lodging application tailored for traveling professionals, fitters (Monteure), and corporate companies in Waldbüttelbrunn near Würzburg. Features instant rate calculations, room category selectors, VAT invoice requesting, and automated PDF voucher delivery.",
    executiveSummary: "Web application engineered for Gästehaus am Forst (Waldbüttelbrunn / Würzburg) to maximize direct booking conversion for traveling professionals, construction/fitter teams (Monteure), and corporate clients while automating PDF voucher delivery.",
    keyFeatures: [
      "Real-time rate calculation engine with long-stay discounts",
      "Corporate worker amenities (large van parking, 24/7 key safe, VAT invoice)",
      "Automated instant PDF reservation voucher generation (Reservierung_GAF-XXXXXX.pdf)",
      "Bilingual German (DE 🇩🇪) & English (GB 🇬🇧) support"
    ],
    featureSections: [
      {
        title: "1. Targeted Value Proposition & Corporate Friendly",
        items: [
          "Corporate & Worker Friendly: Highlights free van/truck parking, single twin beds, kitchenette access, Wi-Fi, 24/7 key safe access, and VAT-compliant corporate invoicing.",
          "Click-to-Call Lead Generation: One-touch phone triggers in header for instant mobile conversion."
        ]
      },
      {
        title: "2. Full Multi-Page Architecture & Rate Calculator",
        items: [
          "Comprehensive Sections: Home, Rooms & Rates (Single, Double, Triple, Fitter Team Rooms), Amenities, Location & Directions to Würzburg.",
          "Interactive Rate Calculator: Real-time cost estimator applying extended-stay discounts for 7+, 14+, or 30+ night bookings."
        ]
      },
      {
        title: "3. Automated Instant PDF Reservation Vouchers",
        items: [
          "PDF Voucher Generation: Generates an official downloadable PDF ticket (Reservierung_GAF-XXXXXX.pdf) containing invoicing, stay dates, VAT breakdowns, and key safe arrival guides."
        ]
      },
      {
        title: "4. Bilingual Support (German 🇩🇪 & English 🇬🇧)",
        items: [
          "Segmented language switcher converting all content, forms, dropdowns, and vouchers between German and English."
        ]
      },
      {
        title: "5. Custom UI Components & Anti-Spam Security",
        items: [
          "Custom Date Picker with quick-presets (Today, Tomorrow, +7 Days), capacity badge dropdowns, and embedded CAPTCHA security challenge."
        ]
      }
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Rate Calculator", "Netlify"],
    previewTheme: "navy-lodging",
    badge: "Freelance Project #4",
    thumbnailSeed: "gastehaus-am-forst"
  },
  {
    id: "die-villa-mannheim",
    title: "Die Villa Mannheim",
    category: "Boutique Hotel & Luxury Suites",
    clientUrl: "https://die-villa-mannheim.netlify.app/",
    description: "Exclusive luxury suite reservation platform for Die Villa in Mannheim, Germany. Provides seamless check-in/check-out date selection, add-on experience selection, anti-bot CAPTCHA security, automated PDF voucher generation, and bilingual support.",
    executiveSummary: "Official web application for Die Villa Mannheim delivering a high-converting direct booking engine, add-on luxury experiences, anti-bot CAPTCHA protection, automated PDF vouchers, and bilingual German/English interface.",
    keyFeatures: [
      "High-converting direct suite booking engine with add-on extras",
      "Automated PDF booking vouchers with barcode verification (DV-749201)",
      "Integrated Anti-Bot CAPTCHA security widget",
      "Bilingual support & interactive transit directions to Bassermannstraße 55"
    ],
    featureSections: [
      {
        title: "1. 💼 High-Converting Direct Booking Engine",
        items: [
          "Instant Availability Search: Live date pickers, guest selector, room category filters, live price calculator with add-on extras (Welcome Champagne & Antipasti, Late Check-Out).",
          "Automated Confirmation & PDF Voucher: Unique verification code (DV-749201) and downloadable PDF booking voucher with barcode verification."
        ]
      },
      {
        title: "2. 🛡️ Integrated Anti-Bot CAPTCHA Security",
        items: [
          "Spam & Bot Protection Widget required before confirming reservations, ensuring verified guest bookings."
        ]
      },
      {
        title: "3. 🛏️ Dedicated Accommodation Showcase",
        items: [
          "Suite Categories: The Classic Room, The Grand Double, and The Villa Suite with room sizes, Wi-Fi 6, acoustic soundproof ratings, and rainfall showers."
        ]
      },
      {
        title: "4. 📍 Location & Transit Directions (Bassermannstraße 55, Mannheim)",
        items: [
          "Embedded Google Maps pointing to Bassermannstraße 55, 68165 Mannheim with multi-modal guides (Car A656/A6, ICE Train Hbf, Tram Line 6 Planetarium)."
        ]
      },
      {
        title: "5. 🌐 Seamless Bilingual Support (English & German)",
        items: [
          "1-click header language toggle updating all text, suite descriptions, booking labels, and PDF vouchers."
        ]
      },
      {
        title: "6. 📜 The Villa Heritage Story & Liquid Glass UX",
        items: [
          "Architectural timeline highlighting 1910 origins and boutique restoration with gold accents (#b38728) and portal popover panes."
        ]
      }
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Reservation Engine", "Netlify"],
    previewTheme: "villa-luxury",
    badge: "Freelance Project #5",
    thumbnailSeed: "die-villa-mannheim"
  }
];
