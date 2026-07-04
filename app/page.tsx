"use client";

import { useState, useEffect, useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const RESEARCH = [
  {
    org: "Microfluidics for Quantitative and Genomics Biology Lab",
    sub: "Stony Brook University",
    role: "Student R&D Assistant",
    date: "Aug 2025 – Present",
    bullets: [
      "Designed and fabricated thermoplastic dPCR partitioning devices using multilayer SU-8 photolithography, hot embossing, and UV-curable adhesive bonding as a cost-effective alternative to conventional PDMS fabrication.",
      "Diagnosed fabrication failures—including non-uniform imprints and restricted liquid flow—by implementing a custom leveling apparatus during oven curing and bracing the substrate against lateral spreading.",
      "Evaluated device performance via brightfield & fluorescent microscopy; characterized adhesive wettability through contact-angle measurements (DI water, NOA72, NEA121RED) on native and plasma-treated polycarbonate, analyzed with ImageJ.",
      "Onboarded and mentored an incoming lab member on fabrication protocols and systematic troubleshooting, reinforcing research continuity across semester transitions.",
    ],
    tags: ["Microfluidics", "dPCR", "Photolithography", "ImageJ", "Cleanroom"],
  },
  {
    org: "Low-Intensity Vibration (LIV) Lab",
    sub: "Stony Brook University",
    role: "Student R&D Assistant",
    date: "Jan 2025 – May 2025",
    bullets: [
      "Developed a Frequency and Amplitude Modulated Sweep (FAMS) vibration signal (20–50 Hz) for T-cell proliferation studies supporting CAR-T cell biomanufacturing.",
      "Engineered a LabVIEW-controlled LIV device integrating an Arduino microcontroller, linear voice-coil actuator, and tri-axis accelerometer to generate custom bilateral sweep signals (0–35 Hz).",
      "Built a Python QC analytics pipeline (Pandas, NumPy, SciPy, Plotly, enDAQ) to verify sweep frequency accuracy, detect noise artifacts, compute acceleration/displacement, and flag deviations above 0.9g.",
      "Explored Oxford Nanopore's EPI2ME platform and wf-teloseq Nextflow workflow to assess telomere-length sequencing as a biomarker readout for LIV-stimulated T-cell studies.",
    ],
    tags: ["Python", "LabVIEW", "Arduino", "SciPy", "Signal Processing"],
  },
  {
    org: "Aquatic Research Environmental Assessment Center (AREAC)",
    sub: "Brooklyn College",
    role: "Research Intern",
    date: "Jul 2023 – Sep 2023",
    bullets: [
      "Analyzed qualitative and quantitative organism data to assess the effects of chemical exposures on aquatic ecosystems.",
      "Represented the research group in a poster presentation at the NYCSRM Consortium at the American Museum of Natural History.",
    ],
    tags: ["Data Analysis", "Environmental Science"],
  },
];

const EXPERIENCE = [
  {
    org: "Goldman Sachs Emerging Leaders Series",
    sub: "Engineering Division",
    role: "Participant",
    date: "Jan 2026 – Apr 2026",
    location: "Dallas, TX",
    bullets: [
      "Engineered a full-stack mutual fund investment predictor using Java Spring Boot and Angular, developing RESTful APIs to compute projected returns from historical data, U.S. Treasury rates, and predictive AI models.",
      "Collaborated with Goldman Sachs engineers to design, test, and present an in-person capstone visualizing expected returns and risk profiles for end-users.",
      "Translated quantitative modeling concepts into accessible presentations for non-technical senior leadership to address complex corporate challenges.",
    ],
    tags: ["Java", "Spring Boot", "Angular", "Python", "Gemini API"],
  },
  {
    org: "Project Destined",
    sub: "Real Estate Private Equity Program",
    role: "Intern",
    date: "Jan 2026 – Mar 2026",
    location: "Remote",
    bullets: [
      "Developed a 10-year financial forecast model for a $6.5M, 28-unit multifamily acquisition projecting a $12.7M terminal value; structured $7.0M+ in capital sources including debt sizing, amortization, and equity optimization.",
      "Synthesized market data into an investment memo pitched to senior executives, communicating risk-return trade-offs and capital structure rationale.",
    ],
    tags: ["Financial Modeling", "Real Estate", "Excel"],
  },
  {
    org: "Rendr — Internal Medicine",
    sub: "Private Practice",
    role: "Shadowing & Medical Intern",
    date: "Jul 2024 – Jan 2026",
    location: "New York, NY",
    bullets: [
      "Directed patients and families to appropriate departments, coordinated referrals across specialties, and responded to high-volume walk-in inquiries with professionalism.",
      "Monitored patient health conditions and reported significant status changes to providers, facilitating care continuity and efficient patient flow.",
    ],
    tags: ["Clinical", "Patient Care", "Healthcare"],
  },
  {
    org: "Residential Safety Program (RSP)",
    sub: "Stony Brook University",
    role: "Safety Operations Assistant",
    date: "Feb 2026 – Present",
    location: "Stony Brook, NY",
    bullets: [
      "Draft detailed incident reports to safeguard 10,000+ campus residents; coordinate with emergency dispatch and leadership during high-pressure events.",
    ],
    tags: ["Operations", "Communication", "Documentation"],
  },
];

type ProjectTag = "All" | "SWE" | "AI/ML" | "Biomedical" | "Finance" | "Hardware";

const PROJECTS: {
  name: string;
  stack: string;
  context: string;
  bullets: string[];
  tags: ProjectTag[];
}[] = [
  {
    name: "Mutual Fund Calculator",
    stack: "Java Spring Boot · Angular · Python · PostgreSQL · Gemini API",
    context: "Goldman Sachs ELS 2026",
    bullets: [
      "Full-stack investment predictor computing projected returns using CAPM and Fama-French models, integrating Yahoo Finance, FRED Treasury, and Newton Analytics APIs across 48 mutual funds and 20 bond funds.",
      "Seeded a PostgreSQL database with bond fund regression coefficients via a Python pipeline; added a Gemini AI chatbot with tool-calling for live projections and guardrailed recommendations, backed by JUnit tests.",
    ],
    tags: ["SWE", "AI/ML", "Finance"],
  },
  {
    name: "Multi-Modal Evidence Review",
    stack: "Gemini API SDK · PyYAML · Pillow · tenacity · tqdm",
    context: "HackerRank Orchestrate 2026 · #85 / 1773",
    bullets: [
      "Built a two-stage multimodal pipeline (Gemini vision) to adjudicate insurance-style damage claims across cars, laptops, and packages — classifying image evidence as supporting, contradicting, or insufficient.",
      "Designed a cheap Stage-1 validity gate (Flash-Lite) screening for blur and wrong-object issues before expensive Stage-2 analysis, cutting cost to ~$0.001/claim while improving flag reliability, with a macro-F1 evaluation harness.",
    ],
    tags: ["AI/ML", "SWE"],
  },
  {
    name: "Sprout",
    stack: "React · Vite · Node.js · Express · PostgreSQL · OpenAI API",
    context: "Healthcare Innovation Challenge 2026",
    bullets: [
      "Built an AI-driven web app converting daily mood check-ins and journal entries into personalized recovery micro-tasks for users with substance use disorder via the OpenAI API.",
      "Implemented JWT auth, row-level data security, and a real-time relapse-risk classification pipeline; presented to a panel of healthcare judges.",
    ],
    tags: ["SWE", "AI/ML", "Biomedical"],
  },
  {
    name: "Mon Sillage",
    stack: "Next.js · React · Tailwind CSS · Google Gemini API",
    context: "L'Oréal Brandstorm 2026",
    bullets: [
      "Developed an AI-powered fragrance recommendation app integrating Gemini API to analyze outfit images, weather, and preferences for scent and application guidance.",
      "Designed a multi-step discovery journey and proposed a circular refillable-vessel model using PCR glass (−30% CO₂), aligned with L'Oréal's 2030 sustainability goals.",
    ],
    tags: ["SWE", "AI/ML"],
  },
  {
    name: "Guitarverse",
    stack: "Next.js · Three.js · MongoDB · Docker · Demucs · basic-pitch",
    context: "HopperHacks WiCS 2026",
    bullets: [
      "Built a gamified guitar practice platform with real-time pitch detection, MIDI import, and 3D tab visualization (Three.js + React Three Fiber).",
      "Integrated Demucs for audio stem separation via a Dockerized Python backend; built NextAuth, campaign modes, and a MongoDB-backed leaderboard.",
    ],
    tags: ["SWE"],
  },
  {
    name: "Surgical Hand-Tracking Robotic Arm",
    stack: "Fusion 360 · Arduino · C++ · Python · MediaPipe",
    context: "Emergent Biodesign 2026",
    bullets: [
      "Built a Python vision-control pipeline (MediaPipe) mapping real-time hand pose to Braccio arm joint angles and gripper commands, with a dual-hand reset trigger to minimize noise.",
      "Programmed Arduino firmware in C++ with per-joint safety validation and incremental 3° motion steps — preserving continuous surgeon judgment in the control loop.",
    ],
    tags: ["Hardware", "AI/ML", "Biomedical"],
  },
  {
    name: "PCA & Clustering Pipeline",
    stack: "Python · NumPy · Pandas · Matplotlib",
    context: "Stony Brook University",
    bullets: [
      "Implemented PCA for dimensionality reduction and applied DBSCAN and K-Means clustering with heat-map visualizations to identify structure and validate data accuracy.",
    ],
    tags: ["AI/ML", "Biomedical"],
  },
  {
    name: "Noninvasive Heart Rate Sensor",
    stack: "C++ · Arduino · Fusion 360",
    context: "Stony Brook University",
    bullets: [
      "Directed a 7-person team through iterative design and prototyping of a wearable sensor; earned Best Presentation Award for exceptional technical communication.",
    ],
    tags: ["Hardware", "Biomedical"],
  },
];

const SKILLS: Record<string, string[]> = {
  "Languages": ["Python", "Java", "TypeScript", "JavaScript", "HTML/CSS", "SQL", "C", "C++", "LabVIEW"],
  "Frameworks & Libraries": ["React", "Next.js", "Node.js", "Express", "Spring Boot", "Angular", "Tailwind CSS", "Pandas", "NumPy", "SciPy", "Scikit-learn", "Jupyter"],
  "Cloud & Data": ["AWS (PostgreSQL RDS)", "Docker", "Git", "MongoDB", "PostgreSQL", "REST APIs", "JWT Auth"],
  "ML & Statistics": ["PCA", "K-Means", "DBSCAN", "Linear/Logistic Regression", "Paired t-test", "Power Analysis", "IBM SPSS"],
  "Bioinformatics": ["DAVID", "Panther DB", "EPI2ME", "Nextflow", "SnapGene"],
  "Design & Tools": ["Fusion 360", "AutoCAD", "CHITUBOX", "Bambu Studio", "Canva", "Adobe Express", "Photoshop"],
  "Lab Techniques": ["SU-8 Photolithography", "Hot Embossing", "UV Bonding", "Oxygen Plasma", "Fluorescent Microscopy", "ImageJ", "RT-PCR", "Western Blotting", "ELISA"],
};

const MARQUEE_SKILLS = ["Python", "React", "Next.js", "TypeScript", "Java", "Spring Boot", "PostgreSQL", "OpenAI API", "Gemini API", "Docker", "MediaPipe", "SciPy", "Three.js", "MongoDB", "LabVIEW", "Fusion 360"];

const POSTERS = [
  { title: "Developing a Thermoplastic Device Capable of Partitioning Samples for dPCR", venue: "SBU URECA Symposium, 2026" },
  { title: "A Piezoelectric-Driven High-Throughput Microfluidic Platform for Optimizing Biomanufacturing for Cell-Based Immunotherapy", venue: "VIP Program Symposium, 2026" },
  { title: "Generation & Validation of a Mechanical Bidirectional Sweep Signal to Bolster Human T-Cell Proliferation for Cancer Immunotherapy", venue: "VIP Program Symposium, 2025" },
];

const LEADERSHIP = [
  {
    org: "Alpha Eta Mu Beta (AEMB) Honor Society",
    role: "Website Developer, Elective Board",
    date: "Apr 2026 – Present",
    desc: "Maintain the organization's website and social presence; design digital and print marketing materials in Canva & Adobe Express, driving increased event participation across departments.",
  },
  {
    org: "NYC PSAL Varsity Fencing Team",
    role: "Athletic Team Manager",
    date: "Sep 2022 – Jul 2024",
    desc: "Directed end-to-end logistics, equipment management, and event coordination for a competitive roster of 20+ athletes across local and regional tournaments.",
  },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="reveal">
      <span className="section-label">
        <span className="w-6 h-px bg-accent inline-block" /> {label}
      </span>
      <h2 className="section-heading">{title}</h2>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return <span className="tag">{label}</span>;
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<ProjectTag>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--mx", `${x}%`);
      hero.style.setProperty("--my", `${y}%`);
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  const filteredProjects =
    activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(activeFilter));
  const filters: ProjectTag[] = ["All", "SWE", "AI/ML", "Biomedical", "Finance", "Hardware"];

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#about" className="text-slate-900 font-bold text-base tracking-tight font-mono">
            MK<span className="text-accent">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
            <a
              href="/Matthew_Kuan_Resume.pdf"
              className="btn-shine text-xs font-semibold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              Resume ↗
            </a>
          </div>
          <button
            className="md:hidden text-slate-700 text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4 flex flex-col gap-4 shadow-lg">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-base"
                onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="/Matthew_Kuan_Resume.pdf" className="text-sm font-semibold text-accent">Resume ↗</a>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        id="about"
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 30%), rgba(37,99,235,0.06), transparent 70%)",
        }}
      >
        <div className="absolute inset-0 grid-bg" />
        <div className="blob blob-1 bg-blue-300/40 w-[380px] h-[380px] top-[-60px] right-[10%]" />
        <div className="blob blob-2 bg-indigo-300/30 w-[320px] h-[320px] bottom-[10%] left-[5%]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full pt-24 pb-16">
          <p className="font-mono text-accent text-sm mb-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
            Available for internships
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-4 leading-[1.05] tracking-tight animate-fade-up"
            style={{ animationDelay: "0.15s" }}>
            Matthew Kuan
          </h1>
          <h2 className="text-2xl md:text-3xl gradient-text font-bold mb-6 animate-fade-up"
            style={{ animationDelay: "0.25s" }}>
            Biomedical Engineer & Software Developer
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed mb-8 animate-fade-up"
            style={{ animationDelay: "0.35s" }}>
            Rising junior at <span className="text-slate-900 font-medium">Stony Brook University</span> studying{" "}
            <span className="text-slate-900 font-medium">Biomedical Engineering & Applied Mathematics</span> (GPA 3.72),
            minoring in Finance. I build at the intersection of biology, signal processing, and software —
            from thermoplastic microfluidic devices in a cleanroom to full-stack AI web apps. Interested in{" "}
            <span className="text-accent font-medium">SWE</span>,{" "}
            <span className="text-accent font-medium">Bioinformatics</span>,{" "}
            <span className="text-accent font-medium">Quant Finance</span>, and{" "}
            <span className="text-accent font-medium">Pharma R&D</span>.
          </p>
          <div className="flex flex-wrap items-center gap-3 animate-fade-up" style={{ animationDelay: "0.45s" }}>
            <a href="#projects"
              className="btn-shine bg-slate-900 text-white font-medium px-6 py-3 rounded-xl hover:bg-accent transition-colors text-sm">
              View Projects
            </a>
            <a href="#contact"
              className="border border-slate-300 text-slate-700 font-medium px-6 py-3 rounded-xl hover:border-accent hover:text-accent transition-colors text-sm">
              Get In Touch
            </a>
            <div className="flex items-center gap-1 ml-2">
              <a href="https://linkedin.com/in/matthewkuan" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-accent hover:border-accent transition-colors text-sm font-medium">in</a>
              <a href="https://github.com/s3raphsembrace" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-accent hover:border-accent transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-400 animate-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── SKILLS MARQUEE ──────────────────────────────────────────────── */}
      <div className="marquee-wrap border-y border-slate-200 bg-slate-50 py-4 overflow-hidden">
        <div className="marquee-track flex gap-8 whitespace-nowrap w-max">
          {[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].map((s, i) => (
            <span key={i} className="text-slate-400 font-mono text-sm flex items-center gap-8">
              {s} <span className="text-accent/40">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── EDUCATION ───────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <SectionHeading label="Background" title="Education" />
        <div className="grid md:grid-cols-2 gap-5">
          <div className="card reveal">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-slate-900 font-bold">Stony Brook University</p>
                <p className="text-slate-500 text-sm">B.E. Biomedical Engineering & Applied Math</p>
              </div>
              <span className="text-slate-400 text-xs text-right shrink-0 ml-2">Expected May 2028</span>
            </div>
            <p className="text-slate-500 text-sm mb-3">
              Minor: Finance · Biomechanics & Materials · <span className="text-accent font-semibold">GPA 3.72</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Linear Algebra", "Probability & Stats", "Principles of Finance", "Organic Chem I & II", "Genetic Engineering", "Data Science w/ Python"].map(c => (
                <span key={c} className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{c}</span>
              ))}
            </div>
          </div>
          <div className="card reveal">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-slate-900 font-bold">Yonsei University</p>
                <p className="text-slate-500 text-sm">International Academic Programs Scholarship</p>
              </div>
              <span className="text-slate-400 text-xs text-right shrink-0 ml-2">Seoul, South Korea</span>
            </div>
            <p className="text-slate-500 text-sm mb-3">
              Study Abroad · <span className="text-accent font-semibold">GPA 4.30 / 4.30</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["East Asian Art History", "Linear Algebra"].map(c => (
                <span key={c} className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ────────────────────────────────────────────────────── */}
      <section id="research" className="max-w-5xl mx-auto px-6 py-20">
        <SectionHeading label="Labs & Publications" title="Research Experience" />
        <div className="flex flex-col gap-5">
          {RESEARCH.map((r) => (
            <div key={r.org} className="card reveal">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
                <div>
                  <p className="text-slate-900 font-bold">{r.org}</p>
                  <p className="text-slate-500 text-sm">{r.sub}</p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <p className="text-accent text-sm font-semibold">{r.role}</p>
                  <p className="text-slate-400 text-xs">{r.date}</p>
                </div>
              </div>
              <ul className="space-y-1.5 mb-4">
                {r.bullets.map((b, i) => (
                  <li key={i} className="text-slate-600 text-sm flex gap-2.5">
                    <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {r.tags.map((t) => <Tag key={t} label={t} />)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 reveal">
          <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
            <span className="text-accent">📄</span> Poster Presentations
          </h3>
          <div className="flex flex-col gap-3">
            {POSTERS.map((p) => (
              <div key={p.title} className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-accent/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center shrink-0 text-accent text-sm font-bold">P</div>
                <div>
                  <p className="text-slate-800 text-sm font-medium leading-snug">{p.title}</p>
                  <p className="text-slate-400 text-xs mt-1">{p.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────────────────────── */}
      <section id="experience" className="max-w-5xl mx-auto px-6 py-20">
        <SectionHeading label="Where I've Worked" title="Experience" />
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-slate-200 to-transparent" />
          <div className="flex flex-col gap-6">
            {EXPERIENCE.map((e) => (
              <div key={e.org} className="relative pl-8 reveal">
                <div className="absolute left-0 top-6 w-3.5 h-3.5 rounded-full bg-white border-2 border-accent" />
                <div className="card">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
                    <div>
                      <p className="text-slate-900 font-bold">{e.org}</p>
                      <p className="text-slate-500 text-sm">{e.sub}</p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-accent text-sm font-semibold">{e.role}</p>
                      <p className="text-slate-400 text-xs">{e.date} · {e.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="text-slate-600 text-sm flex gap-2.5">
                        <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {e.tags.map((t) => <Tag key={t} label={t} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────────── */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
        <SectionHeading label="Things I've Built" title="Projects" />
        <div className="flex flex-wrap gap-2 mb-8 reveal">
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-all duration-200 ${
                activeFilter === f
                  ? "bg-slate-900 text-white border-slate-900"
                  : "border-slate-200 text-slate-500 hover:border-accent hover:text-accent"
              }`}>
              {f}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {filteredProjects.map((p) => (
            <div key={p.name} className="card reveal flex flex-col group">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-slate-900 font-bold group-hover:text-accent transition-colors">{p.name}</h3>
              </div>
              <p className="text-slate-400 text-xs font-mono mb-2 leading-relaxed">{p.stack}</p>
              <p className="text-accent/70 text-xs mb-3 font-medium">{p.context}</p>
              <ul className="space-y-1.5 flex-1 mb-4">
                {p.bullets.map((b, i) => (
                  <li key={i} className="text-slate-600 text-sm flex gap-2.5">
                    <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => <Tag key={t} label={t} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────────────── */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-20">
        <SectionHeading label="My Toolkit" title="Skills" />
        <div className="grid sm:grid-cols-2 gap-5">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <div key={category} className="card reveal">
              <p className="text-slate-900 font-bold text-sm mb-3">{category}</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span key={s} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md hover:bg-accent-soft hover:text-accent transition-colors">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LEADERSHIP ──────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <SectionHeading label="Beyond the Lab" title="Leadership & Activities" />
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {LEADERSHIP.map((l) => (
            <div key={l.org} className="card reveal">
              <div className="flex justify-between items-start mb-1">
                <p className="text-slate-900 font-bold">{l.org}</p>
              </div>
              <p className="text-accent text-sm font-semibold mb-1">{l.role}</p>
              <p className="text-slate-400 text-xs mb-3">{l.date}</p>
              <p className="text-slate-600 text-sm">{l.desc}</p>
            </div>
          ))}
        </div>
        <div className="reveal flex flex-wrap gap-2">
          {["Project Destined 2026", "Goldman Sachs ELS 2026", "McKinsey Forward 2026", "SBU Bioinformatics Bootcamp 2024", "VIP BEAR Team 2024–26", "HackerRank Orchestrate #85/1773", "HopperHacks WiCS 2026", "L'Oréal Brandstorm 2026", "BMES", "AEMB Honor Society"].map(a => (
            <span key={a} className="text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-full hover:border-accent/40 hover:text-accent transition-colors">{a}</span>
          ))}
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-20">
        <div className="reveal relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 md:px-14">
          <div className="blob bg-accent/30 w-[300px] h-[300px] top-[-80px] right-[-40px]" />
          <div className="relative z-10">
            <span className="section-label text-accent-light">
              <span className="w-6 h-px bg-accent-light inline-block" /> Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Let's build something.</h2>
            <p className="text-slate-300 text-sm md:text-base max-w-lg mb-8">
              Open to internship opportunities in SWE, Bioinformatics, Quantitative Finance,
              Pharmaceutical R&D, and related fields. Always happy to chat.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
              {[
                { label: "Email", value: "matthew.kuan@stonybrook.edu", href: "mailto:matthew.kuan@stonybrook.edu" },
                { label: "Phone", value: "(347) 479-4729", href: "tel:3474794729" },
                { label: "LinkedIn", value: "linkedin.com/in/matthewkuan", href: "https://linkedin.com/in/matthewkuan" },
                { label: "GitHub", value: "github.com/s3raphsembrace", href: "https://github.com/s3raphsembrace" },
              ].map((c) => (
                <a key={c.label} href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-accent/50 transition-all group">
                  <span className="text-slate-400 text-xs w-16 shrink-0 font-mono uppercase tracking-wider">{c.label}</span>
                  <span className="text-slate-100 text-sm group-hover:text-accent-light transition-colors truncate">{c.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-slate-400 text-xs">Designed & built by Matthew Kuan · © 2026</p>
          <p className="text-slate-400 text-xs font-mono">Next.js · Tailwind CSS · Vercel</p>
        </div>
      </footer>
    </div>
  );
}
