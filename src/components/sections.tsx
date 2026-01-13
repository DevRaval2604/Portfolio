"use client";

import { motion, useScroll, useSpring, useAnimation } from "framer-motion";
import {
  FiGithub,
  FiMenu
} from "react-icons/fi";
import classNames from "classnames";
import { useEffect, useState } from "react";

const scrollToId = (id: string, delay: number = 0) => {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  
  const performScroll = () => {
    // Dynamic header offset based on screen size
    const isMobile = window.innerWidth < 768;
    const headerOffset = isMobile ? 72 : 88; // Slightly more offset for better alignment
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };
  
  if (delay > 0) {
    setTimeout(performScroll, delay);
  } else {
    performScroll();
  }
};

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" }
];

// Typewriter Effect Component
function TypewriterText({ text, speed = 50, className = "" }: { text: string; speed?: number; className?: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length && !isComplete) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => {
          if (prev + 1 >= text.length) {
            setIsComplete(true);
          }
          return prev + 1;
        });
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

// Floating Particles Background
function FloatingParticles() {
  // Reduce particles on mobile for better performance
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const particleCount = isMobile ? 6 : 12;
  const particles = Array.from({ length: particleCount }, (_, i) => i);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((i) => {
        const startX = Math.random() * dimensions.width;
        const startY = Math.random() * dimensions.height;
        // Simpler animation on mobile for better performance
        const duration = isMobile ? 25 + Math.random() * 15 : 15 + Math.random() * 10;
        const movement = isMobile ? 200 : 400;
        
        return (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-sky-400/30"
            initial={{
              x: startX,
              y: startY,
              opacity: 0
            }}
            animate={{
              y: [startY, startY + (Math.random() * movement - movement/2), startY],
              x: [startX, startX + (Math.random() * movement - movement/2), startX],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
}

// Rotating Icon Component
function RotatingIcon({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}

// Breathing Animation Component
function BreathingCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.02, 1],
        opacity: [0.9, 1, 0.9]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// Animated Counter Component
function AnimatedCounter({ target, suffix = "", className = "" }: { target: number; suffix?: string; className?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target]);

  return <span className={className}>{count}{suffix}</span>;
}

export function Shell() {
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[9998] h-[2px] origin-left bg-gradient-to-r from-sky-400 via-fuchsia-500 to-emerald-400"
        style={{ scaleX: scrollProgress }}
      />

      <header className="fixed top-0 left-0 right-0 z-[9999] w-full border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
        <div className="section-container flex h-16 items-center justify-between md:h-20">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center text-base font-semibold text-slate-100 transition-opacity hover:opacity-80"
            onClick={() => scrollToId("hero")}
          >
            <span className="bg-gradient-title bg-clip-text text-transparent">
              Dev Raval
            </span>
          </motion.button>

          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => scrollToId(item.id)}
                className="nav-link relative text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-400"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
              onClick={() => scrollToId("contact")}
              className="ml-2 rounded-full bg-sky-500 px-5 py-2 text-xs font-semibold text-slate-950 shadow-glow-cyan transition-all hover:scale-105 hover:shadow-glow-purple"
            >
              Let&apos;s Talk
            </motion.button>
          </nav>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 text-slate-200 transition-colors hover:border-sky-500/70 md:hidden"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              if (menu) {
                menu.classList.toggle("hidden");
              }
            }}
            aria-label="Toggle navigation"
          >
            <FiMenu size={18} />
          </motion.button>
        </div>

        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 z-[9999] hidden border-t border-slate-800/70 bg-slate-950/95 backdrop-blur-xl md:hidden"
        >
          <div className="section-container flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  const menu = document.getElementById("mobile-menu");
                  if (menu) menu.classList.add("hidden");
                  scrollToId(item.id, 100);
                }}
                className="w-full rounded-xl px-4 py-3 text-left text-sm text-slate-100 transition-colors hover:bg-slate-900/80"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                const menu = document.getElementById("mobile-menu");
                if (menu) menu.classList.add("hidden");
                scrollToId("contact", 100);
              }}
              className="mt-3 rounded-xl bg-sky-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 shadow-glow-cyan hover:shadow-glow-purple"
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      </header>

      <div className="relative min-h-screen bg-gradient-hero pt-16 md:pt-20">
        <FloatingParticles />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </main>

        <footer className="border-t border-slate-800/70 bg-slate-950 py-6">
          <div className="section-container flex flex-col items-center justify-center gap-3 text-xs text-slate-500 md:flex-row">
            <span>© 2026 Dev Raval. Built with passion and purpose.</span>
          </div>
        </footer>
      </div>
    </>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }
  })
};

const heroContainer = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08
    }
  }
};

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
  }
};

function HeroSection() {
  return (
    <section
      id="hero"
      className="section-padding section-container relative flex min-h-[80vh] items-center justify-center overflow-hidden md:min-h-[90vh]"
    >
      <motion.div
        className="pointer-events-none absolute -left-20 top-[-80px] h-40 w-40 rounded-full bg-sky-500/40 blur-3xl md:-left-56 md:top-[-160px] md:h-80 md:w-80"
        animate={{ x: [0, 12, -8, 0], opacity: [0.5, 0.9, 0.7, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-[-60px] h-40 w-40 rounded-full bg-violet-500/35 blur-3xl md:-right-48 md:bottom-[-120px] md:h-80 md:w-80"
        animate={{ x: [0, -9, 12, 0], opacity: [0.45, 0.85, 0.7, 0.45] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={heroContainer}
        className="relative mx-auto max-w-4xl pt-6 text-center md:pt-10"
      >
        <motion.p variants={heroItem} className="pill mx-auto mb-6">
          Software Developer & Flutter Engineer
        </motion.p>
        <motion.h1
          variants={heroItem}
          className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <TypewriterText 
            text="Hi, I'm " 
            speed={80}
            className="text-white"
          />
          <span className="bg-gradient-title bg-clip-text text-transparent">
            <TypewriterText 
              text="Dev Raval" 
              speed={100}
              className="bg-gradient-title bg-clip-text text-transparent"
            />
          </span>
        </motion.h1>
        <motion.p
          variants={heroItem}
          className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base lg:text-lg"
        >
          <TypewriterText 
            text="Building scalable, AI-powered mobile applications that solve real-world problems. Passionate about creating impactful digital experiences." 
            speed={30}
            className="text-slate-300"
          />
        </motion.p>
        
        {/* Buttons Container */}
        <motion.div
          variants={heroItem}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {/* View My Work Button */}
          <motion.button
            className="primary-btn"
            onClick={() => scrollToId("projects")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(56, 189, 248, 0.4)",
                "0 0 40px rgba(56, 189, 248, 0.6)",
                "0 0 20px rgba(56, 189, 248, 0.4)"
              ]
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            View My Work
            <motion.span 
              className="ml-2 text-base inline-block"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </motion.button>

          {/* Contact Me Button - Updated to match */}
          <motion.button
            key="contact-btn"
            className="primary-btn" 
            onClick={() => scrollToId("contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(56, 189, 248, 0.4)",
                "0 0 40px rgba(56, 189, 248, 0.6)",
                "0 0 20px rgba(56, 189, 248, 0.4)"
              ]
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            Contact Me
            <motion.span 
              className="ml-2 text-base inline-block"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut"}}
            >
              ↓
            </motion.span>
          </motion.button>
        </motion.div>

        <motion.div
          variants={heroItem}
          className="mt-16 flex flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll
          </motion.span>
          <motion.span 
            className="text-lg"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  accentWord
}: {
  eyebrow: string;
  title: string;
  accentWord?: string;
}) {
  const [first, second] = accentWord ? title.split(" ") : [title, ""];
  return (
    <motion.div 
      className="mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.p 
        className="pill mx-auto mb-3"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {eyebrow}
      </motion.p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
        {accentWord ? (
          <>
            {first}{" "}
            <motion.span 
              className="bg-gradient-title bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              {second}
            </motion.span>
          </>
        ) : (
          title
        )}
      </h2>
    </motion.div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section-padding section-container">
      <SectionHeader
        eyebrow="About Me"
        title="Crafting Digital Experiences"
        accentWord="Experiences"
      />
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="glass-card relative overflow-hidden p-8"
          whileHover={{ scale: 1.02 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(56, 189, 248, 0.3)",
              "0 0 40px rgba(56, 189, 248, 0.5)",
              "0 0 20px rgba(56, 189, 248, 0.3)"
            ]
          }}
          transition={{
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <motion.div 
            className="absolute inset-0 rounded-3xl bg-gradient-hero opacity-60"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <motion.div 
              className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-gradient-title shadow-glow-cyan"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-3xl font-semibold text-slate-950">DR</span>
            </motion.div>
            <div className="mt-1">
              <h3 className="text-lg font-semibold text-white">Dev Raval</h3>
              <p className="mt-1 text-sm text-slate-300">
                MSc Information Technology
              </p>
              <p className="text-xs text-slate-500">Ahmedabad, Gujarat</p>
            </div>
            <div className="mt-4 flex gap-4 text-center">
              <motion.div 
                className="rounded-2xl bg-slate-900/80 px-5 py-3"
                whileHover={{ scale: 1.1, y: -5, boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)" }}
                animate={{ y: [0, -4, 0] }}
                transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
              >
                <AnimatedCounter target={3} suffix="+" className="text-lg font-semibold text-white" />
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Projects Built
                </div>
              </motion.div>
              <motion.div 
                className="rounded-2xl bg-slate-900/80 px-5 py-3"
                whileHover={{ scale: 1.1, y: -5, boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)" }}
                animate={{ y: [0, -4, 0] }}
                transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
              >
                <AnimatedCounter target={1} className="text-lg font-semibold text-white" />
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Internship
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
          className="flex flex-col gap-6 text-sm leading-relaxed text-slate-300 md:text-[15px]"
        >
          <p>
            I&apos;m a passionate software developer pursuing my Master&apos;s
            in Information Technology, specializing in building mobile
            applications that make a real difference in people&apos;s lives.
          </p>
          <p>
            With hands-on experience in Flutter, Firebase, and AI integration, I focus on creating intuitive, scalable solutions that bridge the
            gap between complex technology and user needs.
          </p>
          <p>
            From AI-powered cultural learning apps to civic reporting
            platforms, I believe in technology&apos;s power to solve real-world problems and create positive impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section
      id="skills"
      className="section-padding section-container border-t border-slate-800/60"
    >
      <SectionHeader
        eyebrow="What I Do"
        title="Technical Arsenal"
        accentWord="Arsenal"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <SkillGroup
          title="Languages"
          items={["C++", "Java", "Dart", "SQL", "Python"]}
        />
        <SkillGroup title="Frameworks" items={["Flutter"]} />
        <SkillGroup
          title="Cloud & Databases"
          items={[
            "Firebase Auth",
            "Firestore",
            "PostgreSQL",
            "MySQL",
            "Firebase Realtime Database"
          ]}
        />
        <SkillGroup
          title="Developer Tools"
          items={[
            "Git",
            "Android Studio",
            "VS Code",
            "Linux Terminal",
            "Firebase Emulator"
          ]}
        />
        <SkillGroup
          title="APIs & Integration"
          items={["Gemini API", "YouTube API", "REST APIs", "Voice Commands"]}
        />
        <SkillGroup
          title="Core Concepts"
          items={[
            "Data Structures",
            "Algorithms",
            "DBMS",
            "OOP",
            "System Design"
          ]}
          highlight
        />
      </div>
    </section>
  );
}

function SkillGroup({
  title,
  items,
  highlight
}: {
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        whileInView: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        animate: {
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      animate={{
        y: [0, -6, 0]
      }}
      className={classNames(
        "glass-card interactive-card flex flex-col gap-4 p-6",
        highlight && "shadow-glow-cyan"
      )}
    >
      <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <motion.span 
            key={item} 
            className="badge-pill"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              whileInView: { delay: index * 0.05, duration: 0.3 },
              animate: {
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 }
              }
            }}
            whileHover={{ scale: 1.1, y: -2 }}
            animate={{
              boxShadow: [
                "0 0 0px rgba(56, 189, 248, 0)",
                "0 0 8px rgba(56, 189, 248, 0.3)",
                "0 0 0px rgba(56, 189, 248, 0)"
              ]
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section-padding section-container border-t border-slate-800/70"
    >
      <SectionHeader
        eyebrow="Career"
        title="Professional Experience"
        accentWord="Experience"
      />
      <div className="relative flex justify-center">
        <div className="absolute left-1/2 top-10 h-full w-px -translate-x-1/2 bg-gradient-to-b from-sky-500 via-sky-500/40 to-transparent" />
        <div className="relative max-w-2xl w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            whileHover={{ y: -8, scale: 1.01 }}
            className="glass-card interactive-card relative mt-4 ml-auto mr-auto border border-sky-500/40 bg-slate-950/70 p-7 shadow-glow-cyan"
          >
            <div className="absolute left-1/2 -top-[11px] flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-sky-400 bg-slate-950">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Flutter Developer Intern
                </p>
                <p className="mt-1 text-sm font-semibold text-sky-400">
                  Maxgen Technologies Pvt. Ltd
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span>May 2025 – July 2025</span>
                <span className="h-1 w-1 rounded-full bg-slate-600" />
                <span>Ahmedabad, Gujarat</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>
                  Built <span className="font-semibold">Samskara</span>, an
                  AI-powered cultural learning app using Flutter, Firebase, and
                  Gemini API.
                </li>
                <li>
                  Designed features including daily shlokas, curated Indian
                  festivals list, and ancient rulers stories.
                </li>
                <li>
                  Integrated Gemini API for &quot;Ask the Gita&quot; chat
                  feature providing wisdom from Bhagavad Gita.
                </li>
                <li>
                  Utilized Firestore for content storage and Firebase Auth for
                  user authentication.
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                {["Flutter", "Firebase", "Gemini API", "Firestore", "Firebase Auth"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-200"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section-padding section-container border-t border-slate-800/70"
    >
      <SectionHeader
        eyebrow="Portfolio"
        title="Featured Projects"
        accentWord="Projects"
      />
      <div className="space-y-6">
        <ProjectCard
          name="Samskara"
          subtitle="AI-Powered Cultural Learning App"
          problem="Making ancient Indian wisdom accessible and engaging for modern users"
          description="A comprehensive Flutter app that brings Indian culture to life through AI-powered features, daily spiritual content, and interactive learning."
          features={[
            "Daily shlokas with meanings and audio",
            "'Ask the Gita' AI chat powered by Gemini",
            "Curated Indian festivals calendar",
            "Stories of ancient rulers and traditions"
          ]}
          tags={["Flutter", "Firebase", "Gemini API", "Firestore","Firebase Auth"]}
          repoUrl="https://github.com/DevRaval2604/samskara"
        />
        <ProjectCard
          name="Citizen Care"
          subtitle="Civic Issue Reporting Platform"
          problem="Streamlining communication between citizens and local authorities for faster issue resolution"
          description="An Android app enabling citizens to report civic issues with GPS location and image support, featuring role-based workflows for efficient problem resolution."
          features={[
            "GPS-enabled complaint reporting",
            "Role-based access (Citizens, Servicemen, Admins)",
            "Real-time status tracking",
            "Admin dashboards for service delegation"
          ]}
          tags={["Android Studio", "Java", "Firebase", "XML","Firebase Realtime Database","Firebase Auth"]}
          repoUrl="https://github.com/DevRaval2604/citizen-care"
        />
        <ProjectCard
          name="AcaAssist"
          subtitle="AI Academic Assistant"
          problem="Helping students manage assignments and create personalized study schedules efficiently"
          description="An intelligent academic companion that uses AI to recommend study topics, manage tasks, and provide voice-assisted interactions for hands-free productivity."
          features={[
            "AI-powered study schedule generation",
            "Voice-assisted task creation",
            "Google Sign-In with personalized sync",
            "Study analytics and progress tracking"
          ]}
          tags={["Flutter", "Firebase", "Gemini API", "YouTube API","Firestore","Firebase Auth"]}
          repoUrl="https://github.com/DevRaval2604/acaassist"
        />
      </div>
    </section>
  );
}

function ProjectCard({
  name,
  subtitle,
  problem,
  description,
  features,
  tags,
  featured,
  repoUrl
}: {
  name: string;
  subtitle: string;
  problem: string;
  description: string;
  features: string[];
  tags: string[];
  featured?: boolean;
  repoUrl: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        whileInView: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        animate: {
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          boxShadow: featured ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : undefined
        }
      }}
      whileHover={{ y: -10, scale: 1.01 }}
      animate={{
        y: [0, -5, 0],
        boxShadow: featured ? [
          "0 0 20px rgba(56, 189, 248, 0.3)",
          "0 0 50px rgba(56, 189, 248, 0.6)",
          "0 0 20px rgba(56, 189, 248, 0.3)"
        ] : undefined
      }}
      className={classNames(
        "glass-card interactive-card grid gap-8 border border-slate-800/80 bg-slate-950/70 p-7 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]",
        featured && "shadow-glow-cyan"
      )}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="mt-1 text-sm font-medium text-sky-400">{subtitle}</p>
          </div>
          {featured && (
            <motion.span 
              className="rounded-full bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 10px rgba(56, 189, 248, 0.3)",
                  "0 0 20px rgba(56, 189, 248, 0.6)",
                  "0 0 10px rgba(56, 189, 248, 0.3)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ⭐ Featured
            </motion.span>
          )}
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 text-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Problem
          </p>
          <p className="mt-1 text-slate-200">{problem}</p>
        </div>
        <p className="text-sm leading-relaxed text-slate-300">{description}</p>
        <div className="flex flex-wrap gap-2 text-[11px]">
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-200"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.15, y: -3, backgroundColor: "rgba(56, 189, 248, 0.2)" }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        <button 
          onClick={() => window.open(repoUrl, '_blank')}
          className="primary-btn mt-4 inline-flex items-center gap-2"
        >
          <FiGithub className="h-4 w-4" />
          View Code
        </button>
      </div>

      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Key Features
        </p>
        <ol className="space-y-3 text-sm text-slate-300">
          {features.map((feature, index) => (
            <li key={feature} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/15 text-xs font-semibold text-sky-400">
                {index + 1}
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ol>
      </div>
    </motion.article>
  );
}

function EducationSection() {
  return (
    <section
      id="education"
      className="section-padding section-container border-t border-slate-800/70"
    >
      <SectionHeader
        eyebrow="Background"
        title="Education"
        accentWord="Education"
      />
      <div className="grid gap-8 md:grid-cols-2">
        <EducationCard
          degree="MSc - Information Technology"
          institution="Dhirubhai Ambani University"
          location="Gandhinagar, Gujarat"
          duration="2024 - 2026"
        />
        <EducationCard
          degree="Bachelor of Computer Applications"
          institution="JG College Of Computer Applications (Gujarat University)"
          location="Ahmedabad, Gujarat"
          duration="2021 - 2024"
        />
      </div>
    </section>
  );
}

function EducationCard({
  degree,
  institution,
  location,
  duration
}: {
  degree: string;
  institution: string;
  location: string;
  duration: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="glass-card interactive-card flex flex-col gap-3 border border-slate-800/80 bg-slate-950/70 p-7"
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500 text-slate-950 shadow-glow-cyan">
        🎓
      </div>
      <div className="mt-1">
        <h3 className="text-sm font-semibold text-white">{degree}</h3>
        <p className="mt-1 text-sm text-sky-400">{institution}</p>
      </div>
      <p className="text-xs text-slate-400">{location}</p>
      <p className="text-xs text-slate-400">{duration}</p>
    </motion.div>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="section-padding section-container border-t border-slate-800/70"
    >
      <div className="mb-12 text-center">
        <p className="pill mx-auto mb-3">Get In Touch</p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Let&apos;s Build Something{" "}
          <span className="bg-gradient-title bg-clip-text text-transparent">
            Impactful
          </span>
        </h2>
        <p className="mt-3 text-sm text-slate-300 md:text-[15px]">
          Have a project in mind or want to collaborate? I&apos;d love to hear
          from you.
        </p>
      </div>
      <div className="mx-auto max-w-md">
        <div className="space-y-4">
          <ContactCard label="Email" value="devraval2004@gmail.com" />
          <ContactCard label="GitHub" value="DevRaval2604" />
          <ContactCard label="LinkedIn" value="devraval2604" />
          <ContactCard label="Location" value="Ahmedabad, Gujarat, India" />
        </div>
      </div>
    </section>
  );
}

function ContactCard({ label, value }: { label: string; value: string }) {
  const handleClick = () => {
    if (label === 'Email') {
      window.open(`mailto:${value}`);
    } else if (label === 'GitHub') {
      window.open(`https://github.com/${value}`, '_blank');
    } else if (label === 'LinkedIn') {
      window.open(`https://linkedin.com/in/${value}`, '_blank');
    }
  };

  const isClickable = label !== 'Location';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={isClickable ? handleClick : undefined}
      className={`glass-card interactive-card flex items-center justify-between border border-slate-800/80 bg-slate-950/70 px-5 py-4 ${
        isClickable ? 'cursor-pointer' : ''
      }`}
    >
      <div>
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="mt-1 text-sm font-medium text-slate-100">{value}</p>
      </div>
    </motion.div>
  );
}

