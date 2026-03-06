"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import {
  FiGithub,
  FiMenu
} from "react-icons/fi";
import classNames from "classnames";
import { useEffect, useState, ReactNode, createContext, useContext, useMemo, useRef } from "react";
import { sections } from "./navigation";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useIsMobile } from "./useIsMobile";
import { useActiveSection } from "./useActiveSection";
import { useFocusTrap } from "./useFocusTrap";
import { useScrollLock } from "./useScrollLock";
import {
  ProjectCardProps,
  ContactCardProps,
  EducationCardProps,
  SkillGroupProps,
  SectionHeaderProps,
  TypewriterTextProps,
  RotatingIconProps,
  BreathingCardProps,
  AnimatedCounterProps
} from "./portfolio";

const MotionContext = createContext<{
  prefersReducedMotion: boolean;
  isMobile: boolean | undefined;
  shouldAnimateHeavy: boolean;
}>({
  prefersReducedMotion: false,
  isMobile: undefined,
  shouldAnimateHeavy: true
});
MotionContext.displayName = "MotionContext";

// ─── Shared glow animation (replaces repeated inline boxShadow) ───────────
const glowAnimate = {
  boxShadow: [
    "0 0 20px rgba(56, 189, 248, 0.4)",
    "0 0 40px rgba(56, 189, 248, 0.6)",
    "0 0 20px rgba(56, 189, 248, 0.4)"
  ]
};
const glowTransition = {
  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" as const }
};

const scrollToId = (
  id: string,
  delay = 0,
  prefersReducedMotion = false
) => {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  const performScroll = () => {
    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  };

  return delay > 0 ? setTimeout(performScroll, delay) : performScroll();
};

// Typewriter Effect Component
function TypewriterText({ text, speed = 50, className = "", children }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { prefersReducedMotion } = useContext(MotionContext);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    if (currentIndex < text.length && !isComplete) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => {
          if (prev + 1 >= text.length) {
            setIsComplete(true);
          }
          return prev + 1;
        });
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isComplete, prefersReducedMotion]);

  const cursor = !isComplete && <span className="animate-pulse">|</span>;

  const srText = (
    <span className="sr-only" role="status" aria-live="polite">
      {isComplete ? text : ""}
    </span>
  );

  if (children) {
    return (
      <span>
        <span aria-hidden="true">
          {children(displayedText)}
          {cursor}
        </span>
        {srText}
      </span>
    );
  }

  return (
    <span className={className}>
      <span aria-hidden="true">
        {displayedText}
        {cursor}
      </span>
      {srText}
    </span>
  );
}

// Floating Particles Background
function FloatingParticles() {
  const { prefersReducedMotion, isMobile } = useContext(MotionContext);

  const [particles, setParticles] = useState<{
    id: string;
    x: number;
    y: number;
    duration: number;
    delay: number;
    deltaX: number;
    deltaY: number;
  }[]>([]);

  useEffect(() => {
    if (prefersReducedMotion || isMobile === undefined) return;

    let frame: number;
    const generateParticles = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const particleCount = isMobile ? 6 : 12;
        // Cap particle spread to viewport max 1400px for ultrawide screens
        const width = Math.min(window.innerWidth, 1400);
        const height = Math.min(window.innerHeight, 900);
        const movement = isMobile ? 150 : 300;

        const newParticles = Array.from({ length: particleCount }).map(() => ({
          id: (typeof crypto !== "undefined" && crypto.randomUUID)
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          duration: isMobile ? 25 + Math.random() * 15 : 15 + Math.random() * 10,
          delay: Math.random() * 5,
          deltaX: Math.random() * movement - movement / 2,
          deltaY: Math.random() * movement - movement / 2,
        }));
        setParticles(newParticles);
      });
    };

    generateParticles();
    window.addEventListener("resize", generateParticles);
    return () => {
      window.removeEventListener("resize", generateParticles);
      cancelAnimationFrame(frame);
    };
  }, [isMobile, prefersReducedMotion]);

  if (prefersReducedMotion || isMobile === undefined || particles.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{ willChange: "transform" }}
          className="absolute h-1 w-1 rounded-full bg-sky-400/30"
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={{
            x: [p.x, p.x + p.deltaX, p.x],
            y: [p.y, p.y + p.deltaY, p.y],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Rotating Icon Component
function RotatingIcon({ children, className = "" }: RotatingIconProps) {
  const { shouldAnimateHeavy } = useContext(MotionContext);
  return (
    <motion.div
      className={className}
      animate={shouldAnimateHeavy ? { rotate: 360 } : {}}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}

// Breathing Animation Component
function BreathingCard({ children, className = "" }: BreathingCardProps) {
  const { shouldAnimateHeavy } = useContext(MotionContext);
  return (
    <motion.div
      className={className}
      animate={shouldAnimateHeavy ? {
        scale: [1, 1.02, 1],
        opacity: [0.9, 1, 0.9]
      } : {}}
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
function AnimatedCounter({ target, suffix = "", className = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { prefersReducedMotion } = useContext(MotionContext);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

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
  }, [target, prefersReducedMotion]);

  return <span className={className}>{count}{suffix}</span>;
}

export function Shell() {
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const shouldAnimateHeavy = mounted && !prefersReducedMotion;

  useEffect(() => {
    setMounted(true);
  }, []);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sectionIds = useMemo(() => ["hero", ...sections.map(s => s.id)], []);
  const activeSection = useActiveSection(sectionIds);

  const motionValue = useMemo(
    () => ({ prefersReducedMotion, isMobile, shouldAnimateHeavy }),
    [prefersReducedMotion, isMobile, shouldAnimateHeavy]
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useScrollLock(isMobileMenuOpen);
  useFocusTrap(
    isMobileMenuOpen,
    mobileMenuRef,
    menuButtonRef,
    () => setIsMobileMenuOpen(false)
  );

  return (
    <MotionContext.Provider value={motionValue}>
      <motion.div
        className="fixed inset-x-0 top-0 z-[9998] h-[2px] origin-left bg-gradient-to-r from-sky-400 via-fuchsia-500 to-emerald-400"
        style={{ scaleX: scrollProgress }}
      />

      <header className="fixed top-0 left-0 right-0 z-[9999] w-full border-b border-slate-800/70 bg-slate-950/95 md:bg-slate-950/80 md:backdrop-blur-xl">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[99999] focus:top-4 focus:left-4 bg-sky-500 text-slate-950 px-4 py-2 rounded-lg"
        >
          Skip to content
        </a>
        <div className="section-container flex h-16 items-center justify-between md:h-20">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center text-base font-semibold text-slate-100 transition-opacity hover:opacity-80"
            onClick={() => scrollToId("hero", 0, prefersReducedMotion)}
            aria-label="Scroll to top"
          >
            <span className="bg-gradient-title bg-clip-text text-transparent">
              Dev Raval
            </span>
          </motion.button>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 md:flex lg:gap-8"
          >
            {sections.map((item: { id: string; label: string }, index: number) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(item.id, 0, prefersReducedMotion);
                }}
                aria-label={`Go to ${item.label} section`}
                aria-current={activeSection === item.id ? "page" : undefined}
                className={classNames(
                  "nav-link relative text-sm font-medium transition-colors",
                  activeSection === item.id ? "text-white" : "text-slate-300 hover:text-white"
                )}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={shouldAnimateHeavy ? { opacity: 1, scale: 1, ...glowAnimate } : { opacity: 1, scale: 1 }}
              transition={{
                ...(shouldAnimateHeavy && glowTransition),
                duration: 0.5,
                delay: sections.length * 0.1,
              }}
              onClick={() => scrollToId("contact", 0, prefersReducedMotion)}
              className="ml-2 rounded-full bg-sky-500 px-5 py-2 text-xs font-semibold text-slate-950 shadow-glow-cyan transition-all hover:scale-105 hover:shadow-glow-purple"
            >
              Let&apos;s Talk
            </motion.button>
          </nav>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            ref={menuButtonRef}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 text-slate-200 transition-colors hover:border-sky-500/70 focus:outline-none md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <FiMenu size={18} />
          </motion.button>
        </div>

        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={classNames(
            "fixed inset-x-0 top-16 z-[9999] border-t border-slate-800/70 bg-slate-950/95 md:backdrop-blur-xl md:hidden",
            { hidden: !isMobileMenuOpen }
          )}
        >
          <div className="section-container flex flex-col gap-2 py-4">
            {sections.map((item: { id: string; label: string }) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  scrollToId(item.id, 100, prefersReducedMotion);
                }}
                aria-label={`Go to ${item.label} section`}
                aria-current={activeSection === item.id ? "page" : undefined}
                className={classNames(
                  "w-full rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-slate-900/80 text-slate-100 focus:outline-none focus:ring-0 active:bg-transparent"
                )}
              >
                {item.label}
              </a>
            ))}
            <motion.button
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToId("contact", 100, prefersReducedMotion);
              }}
              className="mt-3 rounded-xl bg-sky-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 shadow-glow-cyan hover:shadow-glow-purple focus:outline-none focus:ring-0 active:outline-none"
              animate={shouldAnimateHeavy ? glowAnimate : {}}
              transition={shouldAnimateHeavy ? glowTransition : {}}
            >
              Let&apos;s Talk
            </motion.button>
          </div>
        </div>
      </header>

      <div className="relative min-h-[100svh] bg-gradient-hero pt-16 md:pt-20 overflow-x-hidden">
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

        <footer className="border-t border-slate-800/70 bg-slate-950 py-4 md:py-6 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="section-container flex flex-col items-center justify-center gap-3 text-xs text-slate-500 md:flex-row">
            <span>© 2026 Dev Raval. Built with passion and purpose.</span>
          </div>
        </footer>
      </div>
    </MotionContext.Provider>
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
  const { shouldAnimateHeavy, prefersReducedMotion } = useContext(MotionContext);

  return (
    <section
      id="hero"
      className="section-padding section-container relative flex min-h-[85svh] items-center justify-center overflow-hidden landscape:min-h-[100svh] md:landscape:min-h-[90svh]"
    >
      <motion.div
        className="pointer-events-none absolute -left-20 top-[-80px] h-40 w-40 rounded-full bg-sky-500/40 blur-3xl md:-left-56 md:top-[-160px] md:h-80 md:w-80"
        animate={shouldAnimateHeavy ? { x: [0, 12, -8, 0], opacity: [0.5, 0.9, 0.7, 0.5] } : {}}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-[-60px] h-40 w-40 rounded-full bg-violet-500/35 blur-3xl md:-right-48 md:bottom-[-120px] md:h-80 md:w-80"
        animate={shouldAnimateHeavy ? { x: [0, -9, 12, 0], opacity: [0.45, 0.85, 0.7, 0.45] } : {}}
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
          className="font-semibold leading-tight tracking-tight text-white" style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", minHeight: "clamp(2.5rem, 10vw, 5.5rem)" }}
        >
          <TypewriterText text="Hi, I'm Dev Raval" speed={80}>
            {(currentText: string) => {
              const prefix = "Hi, I'm ";
              const typedPrefix = currentText.slice(0, prefix.length);
              const typedName = currentText.slice(prefix.length);
              return (
                <>
                  {typedPrefix}
                  <span className="bg-gradient-title bg-clip-text text-transparent">
                    {typedName}
                  </span>
                </>
              );
            }}
          </TypewriterText>
        </motion.h1>
        <motion.p
          variants={heroItem}
          className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-300" style={{ fontSize: "clamp(0.875rem, 2vw, 1.125rem)" }}
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
            onClick={() => scrollToId("projects", 0, prefersReducedMotion)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={shouldAnimateHeavy ? glowAnimate : {}}
            transition={shouldAnimateHeavy ? glowTransition : {}}
          >
            View My Work
            <motion.span 
              className="ml-2 text-base inline-block"
              animate={shouldAnimateHeavy ? { y: [0, 4, 0] } : {}}
              transition={shouldAnimateHeavy ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}}
            >
              ↓
            </motion.span>
          </motion.button>

          {/* Contact Me Button */}
          <motion.button
            key="contact-btn"
            className="outline-btn" 
            onClick={() => scrollToId("contact", 0, prefersReducedMotion)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
            <motion.span 
              className="ml-2 text-base inline-block"
              animate={shouldAnimateHeavy ? { y: [0, 4, 0] } : {}}
              transition={shouldAnimateHeavy ? { duration: 1.5, repeat: Infinity, ease: "easeInOut"} : {}}
            >
              ↓
            </motion.span>
          </motion.button>
        </motion.div>

        <motion.div
          variants={heroItem}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500"
        >
          <motion.span
            animate={shouldAnimateHeavy ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={shouldAnimateHeavy ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
          >
            Scroll
          </motion.span>
          <motion.span 
            className="text-lg"
            animate={shouldAnimateHeavy ? { y: [0, 8, 0] } : {}}
            transition={shouldAnimateHeavy ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}}
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
}: SectionHeaderProps) {
  const words = title.split(" ");
  const [first, second] = accentWord 
    ? [words.slice(0, -1).join(" "), words.slice(-1).join(" ")]
    : [title, ""];
  const { shouldAnimateHeavy } = useContext(MotionContext);

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
        animate={shouldAnimateHeavy ? { opacity: [0.7, 1, 0.7] } : {}}
        transition={shouldAnimateHeavy ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
      >
        {eyebrow}
      </motion.p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
        {accentWord ? (
          <>
            {first}{" "}
            <motion.span 
              className="bg-gradient-title bg-clip-text text-transparent"
              animate={shouldAnimateHeavy ? {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              } : {}}
              transition={shouldAnimateHeavy ? {
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              } : {}}
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
  const { shouldAnimateHeavy } = useContext(MotionContext);

  return (
    <section id="about" className="section-padding section-container">
      <SectionHeader
        eyebrow="About Me"
        title="Crafting Digital Experiences"
        accentWord="Experiences"
      />
      <div className="grid gap-6 md:gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="glass-card relative overflow-hidden p-6 sm:p-8"
          whileHover={{ scale: 1.02 }}
          animate={shouldAnimateHeavy ? glowAnimate : {}}
          transition={shouldAnimateHeavy ? glowTransition : {}}
        >
          <motion.div 
            className="absolute inset-0 rounded-3xl bg-gradient-hero opacity-60"
            animate={shouldAnimateHeavy ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            } : {}}
            transition={shouldAnimateHeavy ? {
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            } : {}}
          />
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <motion.div 
              className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-gradient-title shadow-glow-cyan"
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
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-center">
              <motion.div 
                className="rounded-2xl bg-slate-900/80 px-5 py-3"
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <AnimatedCounter target={3} suffix="+" className="text-lg font-semibold text-white" />
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Projects Built
                </div>
              </motion.div>
              <motion.div 
                className="rounded-2xl bg-slate-900/80 px-5 py-3"
                whileHover={{ scale: 1.1, y: -5 }}
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
            "Firebase Emulator",
            "Xcode"
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
}: SkillGroupProps) {
  const { shouldAnimateHeavy } = useContext(MotionContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      animate={shouldAnimateHeavy ? {
        y: [0, -6, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      } : {}}
      className={classNames(
        "glass-card interactive-card flex flex-col gap-4 p-6",
        highlight && "shadow-glow-cyan"
      )}
    >
      <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item: string, index: number) => (
          <motion.span 
            key={item} 
            className="badge-pill"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.1, y: -2 }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function ExperienceSection() {
  const { shouldAnimateHeavy } = useContext(MotionContext);

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
            className="glass-card interactive-card relative mt-4 ml-auto mr-auto border border-sky-500/40 bg-slate-950/70 p-5 sm:p-7 shadow-glow-cyan"
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
                  Built Samskara, an
                  AI-powered cultural learning app using Flutter, Firebase, and
                  Gemini API.
                </li>
                <li>
                  Architected immersive features including Daily Wisdom with modern relevance, 
                  curated Festival guides, and a factual "Stories of India" library covering 
                  Great Rulers, Freedom Fighters, and Ancient Indian Science.
                </li>
                <li>
                  Integrated Gemini API to power "Ask the Gita," a spiritual guidance interface 
                  that translates Bhagavad Gita shlokas into actionable modern-day advice.
                </li>
                <li>
                  Utilized Firestore for content storage and Firebase Auth for
                  user authentication.
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                {["VS Code", "Xcode", "Android Studio", "Flutter", "Firebase", "Gemini API", "Firestore", "Firebase Auth"].map(
                  (t, index) => (
                    <motion.span
                      key={t}
                      className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-200"

                    >
                      {t}
                    </motion.span>
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
          featured
          subtitle="AI-Powered Cultural Learning App"
          problem="Making ancient Indian wisdom accessible and engaging for modern users"
          description="A comprehensive Flutter app that brings Indian culture to life through AI-powered features, daily spiritual content, and interactive learning."
          features={[
            "Daily Shlokas with philosophical deep-dives and modern-day relevance",
            "'Ask the Gita' AI guidance interface for scripture-based problem solving",
            "Curated guide to Indian Festivals with astronomical and cultural insights",
            "Factual History of India: Stories of Rulers, Freedom Fighters, and Ancient Science"
          ]}
          tags={["VS Code", "Xcode", "Android Studio", "Flutter", "Firebase", "Gemini API", "Firestore", "Firebase Auth"]}
          repoUrl="https://github.com/DevRaval2604/samskara"
        />
        <ProjectCard
          name="Citizen Care"
          featured
          subtitle="Civic Issue Reporting Platform"
          problem="Streamlining communication between citizens and local authorities for faster issue resolution"
          description="An Android app enabling citizens to report civic issues with GPS location and image support, featuring role-based workflows for efficient problem resolution."
          features={[
            "GPS-enabled complaint reporting",
            "Role-based access (Citizens, Servicemen, Admins)",
            "Real-time status tracking",
            "Admin dashboards for service delegation"
          ]}
          tags={["Android Studio", "Java", "Firebase", "XML", "Firebase Realtime Database", "Firebase Auth"]}
          repoUrl="https://github.com/DevRaval2604/citizen-care"
        />
        <ProjectCard
          name="AcaAssist"
          featured
          subtitle="AI Academic Assistant"
          problem="Helping students manage assignments and create personalized study schedules efficiently"
          description="An intelligent academic companion that uses AI to recommend study topics, manage tasks, and provide voice-assisted interactions for hands-free productivity."
          features={[
            "AI-powered study schedule generation",
            "Voice-assisted task creation",
            "Google Sign-In with personalized sync",
            "Study analytics and progress tracking"
          ]}
          tags={["Android Studio", "Flutter", "Firebase", "Gemini API", "YouTube API", "Firestore", "Firebase Auth"]}
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
  repoUrl
}: ProjectCardProps) {
  const { shouldAnimateHeavy } = useContext(MotionContext);

  return (
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -10, scale: 1.01 }}
        className="glass-card interactive-card grid gap-6 sm:gap-8 border border-slate-800/80 bg-slate-950/70 p-5 sm:p-7 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]"
      >
      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="mt-1 text-sm font-medium text-sky-400">{subtitle}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 text-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Problem
          </p>
          <p className="mt-1 text-slate-200">{problem}</p>
        </div>
        <p className="text-sm leading-relaxed text-slate-300">{description}</p>
        <div className="flex flex-wrap gap-2 text-[11px]">
          {tags.map((tag: string, index: number) => (
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
        <motion.a 
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="primary-btn mt-4 inline-flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={shouldAnimateHeavy ? glowAnimate : {}}
          transition={shouldAnimateHeavy ? glowTransition : {}}
        >
          <FiGithub className="h-4 w-4" />
          View Code
        </motion.a>
      </div>

      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Key Features
        </p>
        <ol className="space-y-3 text-sm text-slate-300">
          {features.map((feature: string, index: number) => (
            <li key={feature} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-xs font-semibold text-sky-400">
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
      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
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
}: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="glass-card interactive-card flex flex-col gap-3 border border-slate-800/80 bg-slate-950/70 p-5 sm:p-7"
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

function ContactCard({ label, value }: ContactCardProps) {
  let href: string | undefined;
  if (label === 'Email') {
    href = `mailto:${value}`;
  } else if (label === 'GitHub') {
    href = `https://github.com/${value}`;
  } else if (label === 'LinkedIn') {
    href = `https://linkedin.com/in/${value}`;
  }

  const isClickable = !!href;
  const className = `glass-card interactive-card flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border border-slate-800/80 bg-slate-950/70 p-5 sm:px-5 sm:py-4 ${
    isClickable ? 'cursor-pointer' : ''
  }`;

  const content = (
    <>
      <span className="text-xs font-medium text-slate-400 min-w-fit">{label}</span>
      <span className="text-sm font-medium text-slate-100 break-all sm:break-normal sm:text-right">{value}</span>
    </>
  );

  const animationProps = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    whileHover: { y: -4, scale: 1.01 }
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={label === 'Email' ? undefined : "_blank"}
        rel={label === 'Email' ? undefined : "noopener noreferrer"}
        className={className}
        {...animationProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div className={className} {...animationProps}>
      {content}
    </motion.div>
  );
}