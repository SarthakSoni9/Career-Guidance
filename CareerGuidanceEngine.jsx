import { useState, useEffect, useRef } from "react";
import {
  Brain, Gear, ChevronRight, ChevronLeft, CheckCircle2,
  BookOpen, Award, Target, Zap, Code2, Layers,
  Cpu, Palette, TrendingUp, Building2, ExternalLink,
  Sparkles, RotateCcw, MapPin, Star, ArrowRight
} from "lucide-react";

// ─── ROADMAP DATA ─────────────────────────────────────────────────────────────

const roadmapData = {
  "Data Science / AI": {
    icon: Brain,
    color: "from-violet-500 to-indigo-600",
    accent: "violet",
    tagline: "Build the future with intelligent systems",
    stage1: {
      title: "Fundamentals",
      topics: ["Python & NumPy/Pandas", "Statistics & Probability", "Linear Algebra", "Data Structures & Algorithms", "SQL & Databases"],
      resources: [
        { name: "NPTEL – Data Science for Engineers", url: "https://nptel.ac.in/courses/106/106/106106212/" },
        { name: "MIT OCW – 18.06 Linear Algebra", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" },
        { name: "MIT OCW – 6.0002 Computational Thinking", url: "https://ocw.mit.edu/courses/6-0002-introduction-to-computational-thinking-and-data-science-fall-2016/" },
        { name: "NPTEL – Python for Data Science", url: "https://nptel.ac.in/courses/106/106/106106212/" },
      ],
    },
    stage2: {
      title: "Growth",
      certs: [
        { name: "DeepLearning.ai – Machine Learning Specialization", url: "https://www.coursera.org/specializations/machine-learning-introduction", provider: "Coursera" },
        { name: "Google Advanced Data Analytics Certificate", url: "https://grow.google/certificates/advanced-data-analytics/", provider: "Google" },
        { name: "AWS Certified Machine Learning – Specialty", url: "https://aws.amazon.com/certification/certified-machine-learning-specialty/", provider: "AWS" },
      ],
      projects: [
        { title: "Stock Price Predictor", desc: "Time-series LSTM model using NSE data (Yahoo Finance API), with Streamlit dashboard" },
        { title: "Resume ATS Scorer", desc: "NLP pipeline scoring resumes vs. JDs using BERT embeddings, deployed on Hugging Face Spaces" },
      ],
    },
    stage3: {
      title: "Placement",
      keywords: ["Machine Learning", "Deep Learning", "PyTorch / TensorFlow", "MLOps", "Feature Engineering", "A/B Testing", "SQL", "Spark"],
      companies: ["Google DeepMind", "Microsoft AI", "Flipkart (DS Team)", "Swiggy", "Meesho", "Walmart Global Tech", "Mu Sigma"],
      prepLinks: [
        { name: "LeetCode – ML Interview Questions", url: "https://leetcode.com/discuss/interview-question/machine-learning" },
        { name: "GFG – Data Science Interview Prep", url: "https://www.geeksforgeeks.org/data-science-tutorial/" },
        { name: "Kaggle – Build Portfolio", url: "https://www.kaggle.com/" },
      ],
    },
  },

  "UI/UX Design": {
    icon: Palette,
    color: "from-pink-500 to-rose-600",
    accent: "pink",
    tagline: "Craft experiences that feel inevitable",
    stage1: {
      title: "Fundamentals",
      topics: ["Design Principles (Gestalt)", "Typography & Color Theory", "Figma Fundamentals", "User Research Methods", "Information Architecture"],
      resources: [
        { name: "MIT OCW – Design Thinking", url: "https://ocw.mit.edu/courses/15-s50-how-to-make-anything-spring-2021/" },
        { name: "NPTEL – Design Thinking for Innovation", url: "https://nptel.ac.in/courses/109/104/109104109/" },
        { name: "Google UX Design Certificate (Coursera)", url: "https://grow.google/certificates/ux-design/" },
        { name: "MIT OCW – User Interface Design", url: "https://ocw.mit.edu/courses/6-831-user-interface-design-and-implementation-spring-2011/" },
      ],
    },
    stage2: {
      title: "Growth",
      certs: [
        { name: "Google UX Design Professional Certificate", url: "https://grow.google/certificates/ux-design/", provider: "Google" },
        { name: "Interaction Design Foundation – UX Designer", url: "https://www.interaction-design.org/", provider: "IDF" },
        { name: "Meta Product Design Certificate", url: "https://www.coursera.org/professional-certificates/meta-front-end-developer", provider: "Meta" },
      ],
      projects: [
        { title: "Redesign a Gov Portal", desc: "Redesign Aadhaar or DigiLocker UX—document pain points with user interviews, deliver Figma prototype" },
        { title: "Hyperlocal Food App", desc: "Full end-to-end UX for a Tier-2 city food delivery app—user journey maps, wireframes, and hi-fi prototype" },
      ],
    },
    stage3: {
      title: "Placement",
      keywords: ["Figma", "User Research", "Wireframing", "Prototyping", "Usability Testing", "Design Systems", "Accessibility", "Interaction Design"],
      companies: ["Razorpay", "Zomato", "CRED", "Swiggy Design", "Adobe India", "Atlassian", "Freshworks", "Postman"],
      prepLinks: [
        { name: "UI/UX Portfolio Guide – ADPList", url: "https://adplist.org/" },
        { name: "Case Study Club", url: "https://www.casestudy.club/" },
        { name: "UX Collective – Interview Prep", url: "https://uxdesign.cc/" },
      ],
    },
  },

  "Full-Stack SDE": {
    icon: Code2,
    color: "from-emerald-500 to-teal-600",
    accent: "emerald",
    tagline: "Ship products end-to-end at scale",
    stage1: {
      title: "Fundamentals",
      topics: ["Data Structures & Algorithms", "HTML / CSS / JavaScript", "React & Node.js Basics", "Databases (SQL + MongoDB)", "Git & System Design Basics"],
      resources: [
        { name: "MIT OCW – 6.042 Math for CS (DS/Algo)", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/" },
        { name: "NPTEL – Programming in Java", url: "https://nptel.ac.in/courses/106/105/106105191/" },
        { name: "MIT OCW – 6.031 Software Construction", url: "https://ocw.mit.edu/courses/6-031-elements-of-software-construction-fall-2021/" },
        { name: "NPTEL – Cloud Computing", url: "https://nptel.ac.in/courses/106/105/106105143/" },
      ],
    },
    stage2: {
      title: "Growth",
      certs: [
        { name: "Meta Full-Stack Developer Certificate", url: "https://www.coursera.org/professional-certificates/meta-full-stack-developer", provider: "Meta" },
        { name: "AWS Certified Developer – Associate", url: "https://aws.amazon.com/certification/certified-developer-associate/", provider: "AWS" },
        { name: "Google Cloud Professional Developer", url: "https://cloud.google.com/certification/cloud-developer", provider: "Google" },
      ],
      projects: [
        { title: "Real-time Code Collaboration Platform", desc: "VS Code-like collab tool with WebSockets, CRDT conflict resolution, and AWS EC2 deployment" },
        { title: "UPI Expense Tracker", desc: "Full-stack app parsing SMS/UPI data into categorised dashboards—React + Node + PostgreSQL + Vercel" },
      ],
    },
    stage3: {
      title: "Placement",
      keywords: ["React / Next.js", "Node.js / Express", "TypeScript", "REST & GraphQL APIs", "Docker / Kubernetes", "CI/CD", "System Design", "LLD/HLD"],
      companies: ["Google", "Microsoft", "Amazon", "Razorpay", "Zepto", "PhonePe", "Groww", "Atlassian India"],
      prepLinks: [
        { name: "LeetCode – Top Interview 150", url: "https://leetcode.com/studyplan/top-interview-150/" },
        { name: "GFG – SDE Interview Prep", url: "https://www.geeksforgeeks.org/sde-sheet/" },
        { name: "System Design Primer – GitHub", url: "https://github.com/donnemartin/system-design-primer" },
      ],
    },
  },

  "Core Engineering (IoT/Embedded)": {
    icon: Cpu,
    color: "from-amber-500 to-orange-600",
    accent: "amber",
    tagline: "Bridge silicon with software",
    stage1: {
      title: "Fundamentals",
      topics: ["C / C++ Programming", "Digital Electronics & VLSI", "Microcontrollers (Arduino/STM32)", "Signal Processing", "Embedded Linux Basics"],
      resources: [
        { name: "NPTEL – Embedded Systems Design", url: "https://nptel.ac.in/courses/108/105/108105141/" },
        { name: "MIT OCW – 6.004 Computation Structures", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/" },
        { name: "NPTEL – VLSI Design", url: "https://nptel.ac.in/courses/117/105/117105144/" },
        { name: "MIT OCW – Signal Processing", url: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/" },
      ],
    },
    stage2: {
      title: "Growth",
      certs: [
        { name: "AWS IoT Core – Specialty Certification", url: "https://aws.amazon.com/iot/", provider: "AWS" },
        { name: "Google – TensorFlow Lite for Microcontrollers", url: "https://www.coursera.org/learn/introduction-to-tensorflow", provider: "Google" },
        { name: "Arm Accredited Engineer Certification", url: "https://www.arm.com/resources/education/certifications", provider: "Arm" },
      ],
      projects: [
        { title: "Smart Air Quality Monitor", desc: "ESP32 + gas sensors + MQTT to AWS IoT Core, real-time dashboard on Grafana deployed for campus" },
        { title: "Gesture-Controlled Robot Arm", desc: "IMU-driven 6-DOF arm using STM32—build the hardware + write real-time firmware in C++" },
      ],
    },
    stage3: {
      title: "Placement",
      keywords: ["C / C++ Embedded", "RTOS", "CAN / SPI / I2C", "PCB Design", "ARM Cortex", "IoT Protocols (MQTT/CoAP)", "FreeRTOS", "Yocto Linux"],
      companies: ["Texas Instruments India", "Qualcomm India", "ISRO", "Bosch India", "Samsung R&D", "Honeywell", "L&T Technology", "Siemens India"],
      prepLinks: [
        { name: "GFG – Embedded C Interview Prep", url: "https://www.geeksforgeeks.org/embedded-c/" },
        { name: "NPTEL – Interview Questions Bank", url: "https://nptel.ac.in/" },
        { name: "LeetCode – C++ Problems", url: "https://leetcode.com/" },
      ],
    },
  },

  "Product Management": {
    icon: Layers,
    color: "from-sky-500 to-blue-600",
    accent: "sky",
    tagline: "Own the vision, drive the outcome",
    stage1: {
      title: "Fundamentals",
      topics: ["Business & Market Analysis", "SQL & Data Basics for PMs", "Product Lifecycle Management", "User Research & Personas", "Agile & Scrum Methodology"],
      resources: [
        { name: "MIT OCW – 15.387 Entrepreneurship & Innovation", url: "https://ocw.mit.edu/courses/15-387-entrepreneurship-lab-fall-2010/" },
        { name: "NPTEL – Management Information Systems", url: "https://nptel.ac.in/courses/110/105/110105140/" },
        { name: "MIT OCW – 15.269 Leadership Stories", url: "https://ocw.mit.edu/courses/15-269-leadership-stories-literature-ethics-and-authority-fall-2015/" },
        { name: "NPTEL – Business Analytics", url: "https://nptel.ac.in/courses/110/107/110107114/" },
      ],
    },
    stage2: {
      title: "Growth",
      certs: [
        { name: "Google Project Management Certificate", url: "https://grow.google/certificates/project-management/", provider: "Google" },
        { name: "AWS Cloud Practitioner (for PMs)", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", provider: "AWS" },
        { name: "Meta AR/VR Product Strategy (Coursera)", url: "https://www.coursera.org/professional-certificates/meta-ar-developer", provider: "Meta" },
      ],
      projects: [
        { title: "0→1 Product Case Study: EdTech Feature", desc: "Full PRD for a gamified study streak feature on a BYJU's-like app—user interviews, metrics definition, roadmap" },
        { title: "Competitor Teardown Report", desc: "Deep-dive comparison of Swiggy vs Zomato—feature analysis, monetization, positioning deck for 15 slides" },
      ],
    },
    stage3: {
      title: "Placement",
      keywords: ["PRD Writing", "SQL for PMs", "North Star Metric", "A/B Testing", "Roadmapping", "Stakeholder Management", "RICE Prioritization", "GTM Strategy"],
      companies: ["Flipkart", "Meesho", "CRED", "Razorpay", "Nykaa", "Ola", "Swiggy", "Amazon India (APM Program)"],
      prepLinks: [
        { name: "PM Interview Prep – Exponent", url: "https://www.tryexponent.com/" },
        { name: "GFG – Product Management Guide", url: "https://www.geeksforgeeks.org/product-management/" },
        { name: "Lenny's Newsletter – PM Framework", url: "https://www.lennysnewsletter.com/" },
      ],
    },
  },
};

// ─── HEURISTIC ENGINE ────────────────────────────────────────────────────────

function computeHeuristic(academics, interests) {
  const mathLogicScore = (academics.strongest === "Logic/Math" ? 8 : 0) + (academics.weakest === "Logic/Math" ? 0 : 3);
  const creativeScore = (academics.strongest === "Creative/Design" ? 9 : 0) + (academics.weakest === "Creative/Design" ? 0 : 2);
  const mgmtScore = (academics.strongest === "Theory/Management" ? 8 : 0);
  const totalMathLogic = mathLogicScore + interests.aiml + interests.coreEng;
  const totalCreative = creativeScore + interests.uiux;
  const totalWebDev = interests.webdev + (academics.strongest === "Logic/Math" ? 3 : 0);

  if (interests.aiml >= 7 && totalMathLogic > 15) return "Data Science / AI";
  if (interests.uiux >= 7 && totalCreative > 10) return "UI/UX Design";
  if (interests.webdev >= 7 && totalWebDev > 12) return "Full-Stack SDE";
  if (interests.coreEng >= 7) return "Core Engineering (IoT/Embedded)";
  if (mgmtScore > 5) return "Product Management";
  if (interests.aiml >= interests.webdev && interests.aiml >= interests.coreEng) return "Data Science / AI";
  if (interests.webdev >= interests.coreEng) return "Full-Stack SDE";
  return "Core Engineering (IoT/Embedded)";
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const subjects = ["Logic/Math", "Creative/Design", "Theory/Management", "Communication", "Systems/Hardware"];

const STEP_LABELS = ["Profile", "Academics", "Interests", "Goal"];

function ProgressBar({ step }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3">
        {STEP_LABELS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-500
                ${done ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/40"
                  : active ? "bg-slate-800 border-indigo-400 text-indigo-400 shadow-lg shadow-indigo-400/20"
                  : "bg-slate-800/50 border-slate-600 text-slate-500"}`}>
                {done ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span className={`text-[10px] font-medium tracking-wide uppercase transition-colors duration-300
                ${active ? "text-indigo-300" : done ? "text-slate-400" : "text-slate-600"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative h-1 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700 ease-out shadow-lg shadow-indigo-500/50"
          style={{ width: `${(step / (STEP_LABELS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-violet-500/5 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SliderInput({ label, icon: Icon, value, onChange, color }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon size={14} className={`text-${color}-400`} />
          <span className="text-sm text-slate-300 font-medium">{label}</span>
        </div>
        <div className={`text-sm font-bold px-2 py-0.5 rounded-md bg-${color}-500/20 text-${color}-300 min-w-[2rem] text-center`}>
          {value}
        </div>
      </div>
      <div className="relative">
        <input
          type="range" min={1} max={10} step={1}
          value={value}
          onChange={e => onChange(parseInt(e.target.value))}
          className={`w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-700/60 slider-${color}`}
          style={{
            background: `linear-gradient(to right, ${color === 'indigo' ? '#6366f1' : color === 'violet' ? '#8b5cf6' : color === 'emerald' ? '#10b981' : '#f59e0b'} 0%, ${color === 'indigo' ? '#6366f1' : color === 'violet' ? '#8b5cf6' : color === 'emerald' ? '#10b981' : '#f59e0b'} ${(value - 1) / 9 * 100}%, #334155 ${(value - 1) / 9 * 100}%, #334155 100%)`
          }}
        />
      </div>
    </div>
  );
}

function LoadingState({ onComplete }) {
  const [frame, setFrame] = useState(0);
  const messages = [
    "Analyzing your profile...",
    "Mapping to career trajectories...",
    "Generating your roadmap...",
  ];
  useEffect(() => {
    const t = setTimeout(onComplete, 1800);
    const i = setInterval(() => setFrame(f => Math.min(f + 1, 2)), 500);
    return () => { clearTimeout(t); clearInterval(i); };
  }, [onComplete]);
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border border-indigo-400/30 flex items-center justify-center">
          <Brain size={36} className="text-indigo-400 animate-pulse" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/40 animate-ping" />
        <div className="absolute -inset-2 rounded-full border border-violet-500/20 animate-spin" style={{ animationDuration: "3s" }} />
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-slate-200 mb-1">{messages[frame]}</p>
        <div className="flex justify-center gap-1.5 mt-3">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-1.5 rounded-full bg-indigo-500 transition-all duration-500 ${i <= frame ? "w-8" : "w-2 opacity-30"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RoadmapStage({ stage, number, data, accent }) {
  const colorMap = {
    violet: { badge: "bg-violet-500/20 text-violet-300 border-violet-500/30", icon: "text-violet-400", dot: "bg-violet-400" },
    pink: { badge: "bg-pink-500/20 text-pink-300 border-pink-500/30", icon: "text-pink-400", dot: "bg-pink-400" },
    emerald: { badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", icon: "text-emerald-400", dot: "bg-emerald-400" },
    amber: { badge: "bg-amber-500/20 text-amber-300 border-amber-500/30", icon: "text-amber-400", dot: "bg-amber-400" },
    sky: { badge: "bg-sky-500/20 text-sky-300 border-sky-500/30", icon: "text-sky-400", dot: "bg-sky-400" },
  };
  const c = colorMap[accent] || colorMap.violet;

  const icons = [BookOpen, Award, Target];
  const Icon = icons[number - 1];

  return (
    <GlassCard className="flex-1">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.badge} border`}>
          <Icon size={16} className={c.icon} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">Stage {number}</p>
          <p className="text-sm font-bold text-slate-200">{stage.title}</p>
        </div>
      </div>

      {/* Stage 1 Content */}
      {number === 1 && (
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Core Topics</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {stage.topics.map((t, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-slate-700/60 text-slate-300 border border-slate-600/50">{t}</span>
            ))}
          </div>
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Free Resources</p>
          {stage.resources.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-300 transition-colors group/link">
              <div className={`w-1 h-1 rounded-full ${c.dot} flex-shrink-0`} />
              <span className="group-hover/link:underline">{r.name}</span>
              <ExternalLink size={10} className="flex-shrink-0 opacity-0 group-hover/link:opacity-100" />
            </a>
          ))}
        </div>
      )}

      {/* Stage 2 Content */}
      {number === 2 && (
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Certifications</p>
          {stage.certs.map((cert, i) => (
            <a key={i} href={cert.url} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group/cert">
              <div className={`mt-0.5 w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-300 group-hover/cert:text-indigo-300 leading-snug transition-colors">{cert.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{cert.provider}</p>
              </div>
              <ExternalLink size={10} className="text-slate-600 group-hover/cert:text-indigo-400 flex-shrink-0 mt-0.5" />
            </a>
          ))}
          <p className="text-xs uppercase tracking-wide text-slate-500 mt-4 mb-2">Project Ideas</p>
          {stage.projects.map((p, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p className="text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <Sparkles size={10} className={c.icon} />{p.title}
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Stage 3 Content */}
      {number === 3 && (
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Resume Keywords</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {stage.keywords.map((k, i) => (
              <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full border ${c.badge}`}>{k}</span>
            ))}
          </div>
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Target Companies</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {stage.companies.map((co, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-slate-700/60 text-slate-300 border border-slate-600/50 flex items-center gap-1">
                <Building2 size={9} className="text-slate-500" />{co}
              </span>
            ))}
          </div>
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Prep Links</p>
          {stage.prepLinks.map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-300 transition-colors group/link">
              <div className={`w-1 h-1 rounded-full ${c.dot} flex-shrink-0`} />
              <span className="group-hover/link:underline">{l.name}</span>
              <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100" />
            </a>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function CareerGuidanceEngine() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [profile, setProfile] = useState({ name: "", year: "", major: "" });
  const [academics, setAcademics] = useState({ strongest: "", weakest: "" });
  const [interests, setInterests] = useState({ aiml: 5, webdev: 5, coreEng: 5, uiux: 5 });
  const [goal, setGoal] = useState({ mode: "", target: "" });

  const canProceed = () => {
    if (step === 0) return profile.name.trim() && profile.year && profile.major.trim();
    if (step === 1) return academics.strongest && academics.weakest && academics.strongest !== academics.weakest;
    if (step === 2) return true;
    if (step === 3) return goal.mode && (goal.mode === "lost" || goal.target);
    return false;
  };

  const handleSubmit = () => {
    setLoading(true);
    setStep(5);
  };

  const handleLoadComplete = () => {
    setLoading(false);
    let career;
    if (goal.mode === "lost") {
      career = computeHeuristic(academics, interests);
    } else {
      career = goal.target;
    }
    setResult(career);
    setStep(6);
  };

  const handleReset = () => {
    setStep(0); setResult(null); setLoading(false);
    setProfile({ name: "", year: "", major: "" });
    setAcademics({ strongest: "", weakest: "" });
    setInterests({ aiml: 5, webdev: 5, coreEng: 5, uiux: 5 });
    setGoal({ mode: "", target: "" });
  };

  const roadmap = result ? roadmapData[result] : null;
  const RoadmapIcon = roadmap?.icon || Brain;

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "PG/Masters"];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans relative overflow-hidden">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-blue-600/5 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 min-h-screen flex flex-col">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-4">
            <Zap size={11} />
            Career Guidance Engine — India
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-violet-300 mb-2">
            Find Your Career Path
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            A personalized 3-stage roadmap engineered for Indian undergraduates — from fundamentals to placement.
          </p>
        </div>

        {/* Main Panel */}
        {step < 5 && (
          <GlassCard className="max-w-2xl mx-auto w-full">
            <ProgressBar step={step} />

            {/* Step 0: Profile */}
            {step === 0 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">Your Name</label>
                  <input
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Arjun Sharma"
                    className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">Current Year</label>
                  <div className="grid grid-cols-5 gap-2">
                    {years.map(y => (
                      <button key={y} onClick={() => setProfile(p => ({ ...p, year: y }))}
                        className={`py-2 rounded-xl text-xs font-medium border transition-all ${profile.year === y
                          ? "bg-indigo-500/20 border-indigo-500/60 text-indigo-300"
                          : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:border-slate-500"}`}>
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">Branch / Major</label>
                  <input
                    value={profile.major}
                    onChange={e => setProfile(p => ({ ...p, major: e.target.value }))}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Step 1: Academics */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-xs text-slate-400 mb-2 uppercase tracking-wide">Your Strongest Subject Area</label>
                  <div className="grid grid-cols-1 gap-2">
                    {subjects.map(s => (
                      <button key={s} onClick={() => setAcademics(a => ({ ...a, strongest: s }))}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm border transition-all text-left ${academics.strongest === s
                          ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-300"
                          : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:border-slate-500"}`}>
                        <Star size={12} className={academics.strongest === s ? "text-emerald-400" : "text-slate-600"} />
                        {s}
                        {academics.strongest === s && <CheckCircle2 size={14} className="ml-auto text-emerald-400" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2 uppercase tracking-wide">Your Weakest Subject Area</label>
                  <div className="grid grid-cols-1 gap-2">
                    {subjects.filter(s => s !== academics.strongest).map(s => (
                      <button key={s} onClick={() => setAcademics(a => ({ ...a, weakest: s }))}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm border transition-all text-left ${academics.weakest === s
                          ? "bg-rose-500/10 border-rose-500/50 text-rose-300"
                          : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:border-slate-500"}`}>
                        <span className="text-xs">{s}</span>
                        {academics.weakest === s && <CheckCircle2 size={14} className="ml-auto text-rose-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Interests */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <p className="text-xs text-slate-400">Rate your passion & interest level from 1 (low) → 10 (obsessed)</p>
                <SliderInput label="AI / Machine Learning" icon={Brain} value={interests.aiml} onChange={v => setInterests(i => ({ ...i, aiml: v }))} color="violet" />
                <SliderInput label="Web / App Development" icon={Code2} value={interests.webdev} onChange={v => setInterests(i => ({ ...i, webdev: v }))} color="emerald" />
                <SliderInput label="Core Engineering / IoT" icon={Cpu} value={interests.coreEng} onChange={v => setInterests(i => ({ ...i, coreEng: v }))} color="amber" />
                <SliderInput label="UI/UX & Product Design" icon={Palette} value={interests.uiux} onChange={v => setInterests(i => ({ ...i, uiux: v }))} color="indigo" />
              </div>
            )}

            {/* Step 3: Goal */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-2 gap-3">
                  {[{ id: "known", label: "I have a target", sub: "I know what I want", icon: Target },
                    { id: "lost", label: "I am exploring", sub: "Help me discover my path", icon: MapPin }
                  ].map(opt => (
                    <button key={opt.id} onClick={() => setGoal(g => ({ ...g, mode: opt.id }))}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col gap-2 ${goal.mode === opt.id
                        ? "bg-indigo-500/15 border-indigo-500/60"
                        : "bg-slate-800/60 border-slate-700/60 hover:border-slate-500"}`}>
                      <opt.icon size={18} className={goal.mode === opt.id ? "text-indigo-400" : "text-slate-500"} />
                      <p className={`text-sm font-semibold ${goal.mode === opt.id ? "text-indigo-200" : "text-slate-300"}`}>{opt.label}</p>
                      <p className="text-xs text-slate-500">{opt.sub}</p>
                    </button>
                  ))}
                </div>

                {goal.mode === "known" && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <label className="block text-xs text-slate-400 mb-2 uppercase tracking-wide">Select your target career</label>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.keys(roadmapData).map(career => {
                        const CareerIcon = roadmapData[career].icon;
                        return (
                          <button key={career} onClick={() => setGoal(g => ({ ...g, target: career }))}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm border transition-all text-left ${goal.target === career
                              ? "bg-indigo-500/15 border-indigo-500/60 text-indigo-200"
                              : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:border-slate-500"}`}>
                            <CareerIcon size={14} />
                            {career}
                            {goal.target === career && <ArrowRight size={13} className="ml-auto text-indigo-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {goal.mode === "lost" && (
                  <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/25 animate-in fade-in duration-200">
                    <p className="text-sm text-violet-300 flex items-center gap-2">
                      <Brain size={14} />
                      Our heuristic engine will analyze your academic strengths and interests to recommend the best-fit path.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/5">
              {step > 0 ? (
                <button onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white border border-slate-700/60 hover:border-slate-500 transition-all">
                  <ChevronLeft size={14} /> Back
                </button>
              ) : <div />}
              {step < 3 ? (
                <button
                  disabled={!canProceed()}
                  onClick={() => setStep(s => s + 1)}
                  className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${canProceed()
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25"
                    : "bg-slate-700/40 text-slate-500 cursor-not-allowed"}`}>
                  Next <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  disabled={!canProceed()}
                  onClick={handleSubmit}
                  className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${canProceed()
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25"
                    : "bg-slate-700/40 text-slate-500 cursor-not-allowed"}`}>
                  <Sparkles size={14} /> Generate Roadmap
                </button>
              )}
            </div>
          </GlassCard>
        )}

        {/* Loading */}
        {step === 5 && (
          <GlassCard className="max-w-2xl mx-auto w-full">
            <LoadingState onComplete={handleLoadComplete} />
          </GlassCard>
        )}

        {/* Result */}
        {step === 6 && roadmap && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Career Header */}
            <div className="max-w-4xl mx-auto mb-6">
              <GlassCard>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${roadmap.color} flex items-center justify-center shadow-lg`}>
                      <RoadmapIcon size={26} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">
                        {goal.mode === "lost" ? "Recommended for " : "Roadmap for "}<span className="text-indigo-300">{profile.name}</span>
                      </p>
                      <h2 className="text-xl font-bold text-white">{result}</h2>
                      <p className="text-sm text-slate-400 mt-0.5">{roadmap.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-slate-500">{profile.year} · {profile.major}</p>
                    </div>
                    <button onClick={handleReset}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-slate-400 border border-slate-700/60 hover:border-slate-500 hover:text-white transition-all">
                      <RotateCcw size={12} /> Restart
                    </button>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* 3 Stage Roadmap */}
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4 px-1">
                <TrendingUp size={14} className="text-indigo-400" />
                <p className="text-sm font-semibold text-slate-300">Your 3-Stage Learning Roadmap</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <RoadmapStage stage={roadmap.stage1} number={1} accent={roadmap.accent} />
                <RoadmapStage stage={roadmap.stage2} number={2} accent={roadmap.accent} />
                <RoadmapStage stage={roadmap.stage3} number={3} accent={roadmap.accent} />
              </div>
              <p className="text-center text-xs text-slate-600 mt-6">
                Generated by Career Guidance Engine · For Indian Undergraduates · All resources are free or industry-standard
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes animate-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: animate-in 0.4s ease-out both; }
        .fade-in { --tw-enter-opacity: 0; }
        .slide-in-from-right-4 { --tw-enter-translate-x: 1rem; }
        .slide-in-from-bottom-4 { --tw-enter-translate-y: 1rem; }
        .slide-in-from-bottom-2 { --tw-enter-translate-y: 0.5rem; }
        input[type=range]::-webkit-slider-thumb {
          appearance: none; width: 16px; height: 16px; border-radius: 50%;
          background: white; border: 2px solid #6366f1; cursor: pointer;
          box-shadow: 0 0 8px rgba(99,102,241,0.5);
        }
        input[type=range]::-moz-range-thumb {
          width: 16px; height: 16px; border-radius: 50%;
          background: white; border: 2px solid #6366f1; cursor: pointer;
        }
      `}</style>
    </div>
  );
}
