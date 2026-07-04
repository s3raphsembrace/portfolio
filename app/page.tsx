"use client";

import { useState } from "react";

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
    role: "Researcher & Developer",
    date: "Aug 2025 – Present",
    bullets: [
      "Designed and fabricated thermoplastic polycarbonate dPCR devices using multilayer SU-8 photolithography, hot embossing, and UV-curable adhesive bonding as a cost-effective alternative to PDMS fabrication.",
      "Evaluated device performance via brightfield & fluorescent microscopy; characterized adhesive wettability through contact-angle measurements analyzed with ImageJ.",
      "Diagnosed fabrication failures—including die flatness inconsistencies—by implementing a custom leveling apparatus during oven curing, improving production yield and structural consistency.",
      "Onboarded and mentored an incoming lab member on fabrication protocols and systematic troubleshooting, reinforcing research continuity across semester transitions.",
    ],
    tags: ["Microfluidics", "dPCR", "Photolithography", "ImageJ", "Cleanroom"],
  },
  {
    org: "Low-Intensity Vibration (LIV) Lab",
    sub: "Stony Brook University",
    role: "Researcher & Developer",
    date: "Jan 2025 – May 2025",
    bullets: [
      "Developed a Frequency and Amplitude Modulated Sweep (FAMS) vibration signal (20–50 Hz) for T-cell proliferation studies supporting CAR-T cell biomanufacturing.",
      "Engineered a LabVIEW-controlled LIV device integrating an Arduino microcontroller, linear voice-coil actuator, and tri-axis accelerometer to generate custom bilateral sweep signals.",
      "Built a Python QC analytics pipeline (Pandas, NumPy, SciPy, Plotly, enDAQ) to verify sweep frequency accuracy, detect noise artifacts, and flag deviations exceeding 0.9g.",
      "Identified oscillation artifacts at 36–50 Hz, informing hardware redesign; prepared experimental plans for upcoming in vitro T-cell stimulation studies.",
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
      "Engineered a full-stack mutual fund investment predictor using Java Spring Boot and Angular, with RESTful APIs computing projected returns from Yahoo Finance, U.S. Treasury rates, and the Fama-French model.",
      "Integrated a Gemini-powered AI chatbot with structured tool-calling, guardrails for fund recommendations, and live beta fetching from the Newton Analytics API.",
      "Collaborated with Goldman Sachs engineers across design, testing, and in-person capstone presentation.",
    ],
    tags: ["Java", "Spring Boot", "Angular", "Python", "Gemini API", "PostgreSQL"],
  },
  {
    org: "Project Destined",
    sub: "Real Estate Private Equity Program",
    role: "Intern",
    date: "Jan 2026 – Mar 2026",
    location: "Remote",
    bullets: [
      "Developed a 10-year financial forecast model for a $6.5M, 28-unit multifamily acquisition projecting a $12.7M terminal value; structured $7.0M+ in capital sources.",
      "Synthesized market data into an investment memo pitched to senior executives, communicating risk-return trade-offs and capital structure rationale.",
    ],
    tags: ["Financial Modeling", "Real Estate", "Excel"],
  },
  {
    org: "RendrCare",
    sub: "Internal Medicine Private Practice",
    role: "Shadowing & Medical Intern",
    date: "Jul 2024 – Jan 2026",
    location: "New York, NY",
    bullets: [
      "Directed patients and families to appropriate departments, coordinating referrals and responding to high-volume walk-in inquiries with professionalism.",
      "Monitored patient health conditions and reported significant changes to providers, facilitating care continuity and efficient patient flow.",
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
      "Draft detailed incident reports to safeguard 10,000+ campus residents; coordinate with emergency dispatch and university leadership during high-pressure events.",
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
  link?: string;
}[] = [
  {
    name: "Guitarverse",
    stack: "Next.js · TypeScript · React · Three.js · MongoDB · Web Audio API · Docker",
    context: "HopperHacks Women in CS 2026",
    bullets: [
      "Built a gamified guitar practice platform with real-time 3D tab visualization (Three.js), live pitch detection (Web Audio API + basic-pitch), and a competitive leaderboard.",
      "Containerized the audio-processing backend with Docker; implemented NextAuth, campaign modes, and profile management backed by MongoDB.",
    ],
    tags: ["SWE"],
  },
  {
    name: "Sprout",
    stack: "React · Vite · Node.js · Express · PostgreSQL · OpenAI API",
    context: "Scholars for Medicine Healthcare Innovation Challenge 2026",
    bullets: [
      "Built an AI-driven web app converting daily mood check-ins and journal sentiment into personalized recovery micro-tasks for users with substance use disorder via the OpenAI API.",
      "Implemented JWT auth, row-level data security, and a relapse-risk classification pipeline; presented to a panel of healthcare judges.",
    ],
    tags: ["SWE", "AI/ML", "Biomedical"],
  },
  {
    name: "Mon Sillage",
    stack: "Next.js · TypeScript · React · Tailwind CSS · Google Gemini API",
    context: "L'Oréal Brandstorm 2026",
    bullets: [
      "Developed an AI-powered personalized fragrance recommendation app integrating Gemini API to analyze outfit images, weather, and preferences for scent and application guidance.",
      "Designed a multi-step, state-driven discovery workflow; proposed a circular refillable vessel model aligned with L'Oréal's 2030 sustainability goals.",
    ],
    tags: ["SWE", "AI/ML"],
  },
  {
    name: "Mutual Fund Historical Calculator",
    stack: "Java Spring Boot · Angular · Python · PostgreSQL · Gemini API",
    context: "Goldman Sachs Emerging Leaders Series 2026",
    bullets: [
      "Full-stack investment predictor computing projected returns using Yahoo Finance data, FRED Treasury rates, and the Fama-French three-factor model via RESTful APIs.",
      "Added a Gemini AI chatbot with tool-calling for live return projections and guardrailed fund recommendations; wrote JUnit tests validating computation correctness.",
    ],
    tags: ["SWE", "AI/ML", "Finance"],
  },
  {
    name: "Surgical Hand-Tracking Robotic Arm",
    stack: "Python · MediaPipe · Arduino · C++ · Fusion 360",
    context: "Spring 2026",
    bullets: [
      "Built a Python vision-control pipeline using MediaPipe to map real-time hand pose to Braccio arm joint angles and gripper commands, with a dual-hand reset trigger to reduce noise.",
      "Programmed Arduino firmware in C++ with per-joint safety validation, incremental 3° motion steps, and serial communication — preserving surgeon judgment in the control loop at all times.",
    ],
    tags: ["Hardware", "AI/ML", "Biomedical"],
  },
  {
    name: "Bioinformatics Pipeline for Genomic Annotation",
    stack: "Python · Pandas · NumPy · Jupyter · DAVID/Panther DB",
    context: "Fall 2025",
    bullets: [
      "Built a standalone pipeline to clean, merge, and filter transcriptomic datasets by statistical thresholds (p < 0.05, |log₂FC| > 1) and map Entrez IDs to functional annotations.",
      "Leveraged DAVID Bioinformatics Resources and Panther DB to generate functional annotation charts of biological processes.",
    ],
    tags: ["Biomedical", "AI/ML"],
  },
  {
    name: "Acidosis Bone Mechanical Strength Analysis",
    stack: "IBM SPSS · Microsoft Excel · INSTRON UTM",
    context: "Fall 2025",
    bullets: [
      "Designed an ex vivo three-point bending study on 20 matched-pair chicken femora; found a statistically significant 15% reduction in force-to-failure at acidic pH (p = 0.009).",
    ],
    tags: ["Biomedical"],
  },
  {
    name: "Noninvasive Heart Rate Sensor",
    stack: "C++ · Arduino · Fusion 360",
    context: "Stony Brook University",
    bullets: [
      "Directed a 7-person team through iterative design, prototyping, and testing of a wearable sensor; earned Best Presentation Award for exceptional technical communication.",
    ],
    tags: ["Hardware", "Biomedical"],
  },
];

const SKILLS = {
  "Languages": ["Python", "Java", "TypeScript", "JavaScript", "HTML/CSS", "SQL", "C/C++", "LabVIEW"],
  "Frontend": ["React", "Next.js", "Tailwind CSS", "Three.js", "React Three Fiber", "Web Audio API"],
  "Backend & Cloud": ["Node.js", "Express", "Spring Boot", "Angular", "PostgreSQL", "MongoDB", "AWS (RDS)", "Docker"],
  "AI & Data": ["OpenAI API", "Gemini API (tool-calling)", "Scikit-learn", "Pandas", "NumPy", "SciPy", "Matplotlib", "Jupyter"],
  "ML & Statistics": ["PCA", "K-Means", "DBSCAN", "Linear Regression", "Logistic Regression", "Paired t-test", "IBM SPSS"],
  "Bioinformatics": ["DAVID DB", "Panther DB", "EPI2ME", "Nextflow", "SnapGene"],
  "Lab Techniques": ["SU-8 Photolithography", "Hot Embossing", "UV Bonding", "Oxygen Plasma", "Fluorescent Microscopy", "ImageJ", "Western Blotting", "ELISA"],
  "Design & Tools": ["Fusion 360", "AutoCAD", "Git/GitHub", "Canva", "Adobe Express", "Microsoft Office"],
};

const POSTERS = [
  {
    title: "Developing a Thermoplastic Device Capable of Partitioning Samples for dPCR",
    venue: "SBU URECA Symposium, 2026",
  },
  {
    title: "A Piezoelectric-Driven High-Throughput Microfluidic Platform for Optimizing Biomanufacturing Process for Cell-Based Immunotherapy Cancer Treatment",
    venue: "VIP Program Symposium, 2026",
  },
  {
    title: "Generation & Validation of a Mechanical Bidirectional Sweep Signal to Bolster Human T-Cell Proliferation for Cancer Immunotherapy",
    venue: "VIP Program Symposium, 2025",
  },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="section-heading">{children}</h2>
      <div className="section-divider" />
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

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags.includes(activeFilter));

  const filters: ProjectTag[] = ["All", "SWE", "AI/ML", "Biomedical", "Finance", "Hardware"];

  return (
    <div className="min-h-screen bg-navy-900 text-slate-300">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#about" className="text-white font-semibold text-sm tracking-wide font-mono">
            mk<span className="text-accent">.</span>
          </a>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
            <a
              href="/Matthew_Kuan_Resume.pdf"
              className="text-xs font-medium bg-accent/10 text-accent border border-accent/30 px-3 py-1.5 rounded-lg hover:bg-accent/20 transition-colors"
            >
              Resume ↗
            </a>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-navy-800 border-t border-slate-800 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center max-w-5xl mx-auto px-6 pt-24 pb-16"
      >
        <p className="font-mono text-accent text-sm mb-4">Hi, I&apos;m</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 leading-tight">
          Matthew Kuan
        </h1>
        <h2 className="text-xl md:text-2xl gradient-text font-semibold mb-6">
          Biomedical Engineer & Software Developer
        </h2>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
          Rising junior at <span className="text-white">Stony Brook University</span> studying{" "}
          <span className="text-white">Biomedical Engineering & Applied Mathematics</span> (GPA 3.72),
          with a minor in Finance. I build things at the intersection of biology, signal processing,
          and software — from thermoplastic microfluidic devices in a cleanroom to full-stack AI
          web apps. Currently interested in roles spanning{" "}
          <span className="text-accent-light">SWE</span>,{" "}
          <span className="text-accent-light">Bioinformatics</span>,{" "}
          <span className="text-accent-light">Quantitative Finance</span>, and{" "}
          <span className="text-accent-light">Pharmaceutical R&amp;D</span>.
        </p>
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { label: "📍 Brooklyn, NY" },
            { label: "🎓 Stony Brook University" },
            { label: "🔬 Microfluidics & LIV Labs" },
          ].map((b) => (
            <span
              key={b.label}
              className="text-sm bg-slate-800/60 border border-slate-700 px-3 py-1.5 rounded-full text-slate-300"
            >
              {b.label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#projects"
            className="bg-accent text-white font-medium px-5 py-2.5 rounded-lg hover:bg-blue-500 transition-colors text-sm"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border border-slate-600 text-slate-300 font-medium px-5 py-2.5 rounded-lg hover:border-accent hover:text-white transition-colors text-sm"
          >
            Get In Touch
          </a>
          <a
            href="https://linkedin.com/in/matthewkuan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-accent transition-colors text-sm"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/matthewkuan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-accent transition-colors text-sm"
          >
            GitHub ↗
          </a>
        </div>

        {/* Honors strip */}
        <div className="mt-14 flex flex-wrap gap-2">
          {[
            "Presidential Scholarship",
            "Dean's List 2024–2026",
            "SBU IAP Scholarship",
            "Pinkerton Science Scholarship",
            "PWF Academic Scholarship",
            "HackerRank Orchestrate #85/2000+",
          ].map((h) => (
            <span key={h} className="text-xs text-slate-500 border border-slate-800 px-2.5 py-1 rounded-md">
              {h}
            </span>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ───────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <SectionHeading>Education</SectionHeading>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-white font-semibold">Stony Brook University</p>
                <p className="text-slate-400 text-sm">B.E. Biomedical Engineering &amp; Applied Math &amp; Statistics</p>
              </div>
              <span className="text-slate-500 text-xs text-right shrink-0 ml-2">Expected May 2028</span>
            </div>
            <p className="text-slate-400 text-sm mb-3">
              Minor: Finance &nbsp;·&nbsp; Specialization: Biomechanics &amp; Materials &nbsp;·&nbsp;
              <span className="text-accent-light font-medium">GPA: 3.72</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Linear Algebra", "Probability & Stats", "Principles of Finance", "Organic Chemistry", "Genetic Engineering"].map(c => (
                <span key={c} className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">{c}</span>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-white font-semibold">Yonsei University</p>
                <p className="text-slate-400 text-sm">International Academic Programs Study Abroad Scholarship</p>
              </div>
              <span className="text-slate-500 text-xs text-right shrink-0 ml-2">Seoul, South Korea</span>
            </div>
            <p className="text-slate-400 text-sm">
              <span className="text-accent-light font-medium">GPA: 4.33 / 4.33</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ────────────────────────────────────────────────────── */}
      <section id="research" className="max-w-5xl mx-auto px-6 py-16">
        <SectionHeading>Research</SectionHeading>
        <div className="flex flex-col gap-6">
          {RESEARCH.map((r) => (
            <div key={r.org} className="card">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
                <div>
                  <p className="text-white font-semibold">{r.org}</p>
                  <p className="text-slate-400 text-sm">{r.sub}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-accent-light text-sm font-medium">{r.role}</p>
                  <p className="text-slate-500 text-xs">{r.date}</p>
                </div>
              </div>
              <ul className="space-y-1.5 mb-3">
                {r.bullets.map((b, i) => (
                  <li key={i} className="text-slate-400 text-sm flex gap-2">
                    <span className="text-accent shrink-0 mt-0.5">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {r.tags.map((t) => <Tag key={t} label={t} />)}
              </div>
            </div>
          ))}
        </div>

        {/* Poster presentations */}
        <div className="mt-10">
          <h3 className="text-white font-semibold mb-4">Poster Presentations</h3>
          <div className="flex flex-col gap-3">
            {POSTERS.map((p) => (
              <div key={p.title} className="flex gap-4 items-start p-4 bg-slate-800/40 rounded-lg border border-slate-800">
                <span className="text-accent shrink-0 mt-0.5 text-lg">📄</span>
                <div>
                  <p className="text-slate-200 text-sm font-medium">{p.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{p.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────────────────────── */}
      <section id="experience" className="max-w-5xl mx-auto px-6 py-16">
        <SectionHeading>Experience</SectionHeading>
        <div className="relative pl-6">
          <div className="timeline-line" />
          <div className="flex flex-col gap-8">
            {EXPERIENCE.map((e) => (
              <div key={e.org} className="relative">
                <div className="absolute -left-6 top-2 w-2.5 h-2.5 rounded-full bg-accent border-2 border-navy-900" />
                <div className="card ml-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
                    <div>
                      <p className="text-white font-semibold">{e.org}</p>
                      <p className="text-slate-400 text-sm">{e.sub}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-accent-light text-sm font-medium">{e.role}</p>
                      <p className="text-slate-500 text-xs">{e.date}</p>
                      <p className="text-slate-600 text-xs">{e.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-3">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="text-slate-400 text-sm flex gap-2">
                        <span className="text-accent shrink-0 mt-0.5">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {e.tags.map((t) => <Tag key={t} label={t} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────────── */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-16">
        <SectionHeading>Projects</SectionHeading>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-sm px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                activeFilter === f
                  ? "bg-accent text-white border-accent"
                  : "border-slate-700 text-slate-400 hover:border-accent/50 hover:text-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredProjects.map((p) => (
            <div key={p.name} className="card flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-white font-semibold">{p.name}</h3>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    className="text-accent text-sm hover:underline shrink-0 ml-2">↗</a>
                )}
              </div>
              <p className="text-slate-500 text-xs font-mono mb-3 leading-relaxed">{p.stack}</p>
              <p className="text-slate-600 text-xs mb-3 italic">{p.context}</p>
              <ul className="space-y-1.5 flex-1">
                {p.bullets.map((b, i) => (
                  <li key={i} className="text-slate-400 text-sm flex gap-2">
                    <span className="text-accent shrink-0 mt-0.5">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {p.tags.map((t) => <Tag key={t} label={t} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────────────── */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-16">
        <SectionHeading>Skills</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <div key={category} className="card">
              <p className="text-white font-medium text-sm mb-3">{category}</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span key={s} className="text-xs bg-slate-700/60 text-slate-300 px-2.5 py-1 rounded-md">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-16">
        <SectionHeading>Contact</SectionHeading>
        <div className="card max-w-lg">
          <p className="text-slate-400 text-sm mb-6">
            Open to internship opportunities in SWE, Bioinformatics, Quantitative Finance,
            Pharmaceutical R&amp;D, and related fields. Feel free to reach out.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { label: "Email", value: "matthew.kuan@stonybrook.edu", href: "mailto:matthew.kuan@stonybrook.edu" },
              { label: "LinkedIn", value: "linkedin.com/in/matthewkuan", href: "https://linkedin.com/in/matt-kuan" },
              { label: "GitHub", value: "github.com/matthewkuan", href: "https://github.com/s3raphsembrace" },
              //{ label: "Phone", value: "(347) 479-4729", href: "tel:3474794729" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors group"
              >
                <span className="text-slate-500 text-sm w-16 shrink-0">{c.label}</span>
                <span className="text-slate-300 text-sm group-hover:text-accent transition-colors">{c.value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800 max-w-5xl mx-auto px-6 py-6">
        <p className="text-slate-600 text-xs text-center">
          Built with Next.js & Tailwind CSS · Matthew Kuan © 2026
        </p>
      </footer>
    </div>
  );
}
