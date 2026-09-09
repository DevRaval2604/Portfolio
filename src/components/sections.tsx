import type { ReactNode } from "react";
import {
  FiArrowUpRight, FiBookOpen, FiBriefcase, FiCloud,
  FiCode, FiCpu, FiGithub, FiLayers, FiLinkedin, FiMail,
  FiMapPin, FiTool, FiZap, FiFileText, FiGrid, FiSearch, FiUsers,
} from "react-icons/fi";
import { Header } from "./header";
import { ProfileAnimation } from "./profile-animation";
import { education, projects, skills, profile, budventure } from "./content";
import type { ProjectCardProps, SectionHeaderProps } from "./portfolio";

const experienceTags = ["VS Code", "Xcode", "Android Studio", "Flutter", "Firebase", "Gemini API", "Firestore", "Firebase Auth"];
const skillIcons = [FiBriefcase, FiFileText, FiGrid, FiSearch, FiUsers, FiCode, FiLayers, FiCloud, FiTool, FiZap, FiCpu];

export function Shell() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <span>© 2026 Dev Raval. Built with passion and purpose.</span>
          <a href="#hero" className="back-to-top" aria-label="Scroll to top"><FiArrowUpRight aria-hidden="true" /></a>
        </div>
      </footer>
    </>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="role-label">{profile.headline}</p>
            <h1 id="hero-title">
              <span className="hero-greeting">Hi, I&apos;m </span>
              <span className="hero-name">Dev <span>Raval</span></span>
            </h1>
            <p className="hero-description">{profile.summary}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View My Work <FiArrowUpRight aria-hidden="true" /></a>
              <a className="button button-outline" href="#contact">Contact Me <FiArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="profile-card">
            <ProfileAnimation />
            <div className="profile-details">
              <h2>Dev Raval</h2>
              <p>MSc Information Technology</p>
            </div>
            <dl className="profile-stats">
              <div><dt>Projects Built</dt><dd>3<span>+</span></dd></div>
              <div><dt>Internships</dt><dd>2</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, accentWord }: SectionHeaderProps) {
  const leadingText = accentWord ? title.slice(0, -accentWord.length) : title;
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{leadingText}{accentWord && <span>{accentWord}</span>}</h2>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">
        <SectionHeader eyebrow="About Me" title="Connecting Business & Technology" accentWord="Technology" />
        <div className="about-copy">
          {profile.about.map((paragraph, index) => <p key={paragraph} className={index === 0 ? "about-lead" : undefined}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <SectionHeader eyebrow="What I Bring" title="Skills & Capabilities" accentWord="Capabilities" />
        <div className="skills-grid">
          {skills.map((group, index) => {
            const Icon = skillIcons[index];
            return (
              <article className="skill-card" key={group.title}>
                <div className="skill-heading"><span className="icon-tile"><Icon aria-hidden="true" /></span><h3>{group.title}</h3></div>
                <TagList items={group.items} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <SectionHeader eyebrow="Career" title="Professional Experience" accentWord="Experience" />
        <article className="experience-card">
          <div className="experience-summary">
            <span className="icon-tile"><FiBriefcase aria-hidden="true" /></span>
            <p className="experience-date">{budventure.duration}</p>
            <h3>{budventure.role}</h3>
            <p className="company-name">{budventure.company}</p>
            <p className="location"><FiMapPin aria-hidden="true" />{budventure.location}</p>
          </div>
          <div className="experience-details">
            <ul className="experience-list">
              {budventure.responsibilities.map(responsibility => <li key={responsibility}>{responsibility}</li>)}
            </ul>
            <TagList items={budventure.tags} />
          </div>
        </article>
        <article className="experience-card">
          <div className="experience-summary">
            <span className="icon-tile"><FiBriefcase aria-hidden="true" /></span>
            <p className="experience-date">May 2025 – July 2025</p>
            <h3>Flutter Developer Intern</h3>
            <p className="company-name">Maxgen Technologies Pvt. Ltd</p>
            <p className="location"><FiMapPin aria-hidden="true" />Ahmedabad, Gujarat</p>
          </div>
          <div className="experience-details">
            <ul className="experience-list">
              <li>Built Samskara, an AI-powered cultural learning app using Flutter, Firebase, and Gemini API.</li>
              <li>Architected immersive features including Daily Wisdom with modern relevance, curated Festival guides, and a factual &quot;Stories of India&quot; library covering Great Rulers, Freedom Fighters, and Ancient Indian Science.</li>
              <li>Integrated Gemini API to power &quot;Ask the Gita,&quot; a spiritual guidance interface that translates Bhagavad Gita shlokas into actionable modern-day advice.</li>
              <li>Utilized Firestore for content storage and Firebase Auth for user authentication.</li>
            </ul>
            <TagList items={experienceTags} />
          </div>
        </article>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <SectionHeader eyebrow="Portfolio" title="Featured Projects" accentWord="Projects" />
        <div className="project-list">
          {projects.map((project, index) => <ProjectCard key={project.name} {...project} index={index} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ name, subtitle, problem, description, features, tags, repoUrl, index }: ProjectCardProps & { index: number }) {
  return (
    <article className="project-card" aria-labelledby={`project-title-${index}`}>
      <div className="project-topline">
        <span className="project-number" aria-hidden="true">0{index + 1}</span>
        <span className="project-topline-rule" />
      </div>
      <div className="project-heading">
        <div><h3 id={`project-title-${index}`}>{name}</h3><p className="project-subtitle">{subtitle}</p></div>
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="button code-link" aria-label={`View Code for ${name} (opens in a new tab)`}><FiGithub aria-hidden="true" />View Code<FiArrowUpRight aria-hidden="true" /></a>
      </div>
      <div className="project-body">
        <div className="project-story">
          <div className="project-problem"><p className="detail-label">Problem</p><p>{problem}</p></div>
          <p className="project-description">{description}</p>
        </div>
        <div className="project-features">
          <p className="detail-label">Key Features</p>
          <ol>
            {features.map((feature, i) => <li key={feature}><span className="feature-number" aria-hidden="true">0{i + 1}</span><span>{feature}</span></li>)}
          </ol>
        </div>
      </div>
      <div className="project-tags"><TagList items={tags} /></div>
    </article>
  );
}

function EducationSection() {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        <SectionHeader eyebrow="Background" title="Education" accentWord="Education" />
        <div className="education-grid">
          {education.map(item => (
            <article className="education-card" key={item.degree}>
              <div className="education-topline"><span className="icon-tile"><FiBookOpen aria-hidden="true" /></span><p>{item.duration}</p></div>
              <h3>{item.degree}</h3>
              <p className="institution">{item.institution}</p>
              <p className="location"><FiMapPin aria-hidden="true" />{item.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-grid">
        <div className="contact-copy">
          <SectionHeader eyebrow="Get In Touch" title="Let's Build Something Impactful" accentWord="Impactful" />
          <p>Have a project in mind or want to collaborate? I&apos;d love to hear from you.</p>
        </div>
        <div className="contact-list">
          <ContactCard label="Email" value="devraval2004@gmail.com" href="mailto:devraval2004@gmail.com" icon={<FiMail />} />
          <ContactCard label="GitHub" value="DevRaval2604" href="https://github.com/DevRaval2604" icon={<FiGithub />} />
          <ContactCard label="LinkedIn" value="devraval2604" href="https://linkedin.com/in/devraval2604" icon={<FiLinkedin />} />
          <ContactCard label="Location" value="Ahmedabad, Gujarat, India" icon={<FiMapPin />} />
        </div>
      </div>
    </section>
  );
}

function ContactCard({ label, value, href, icon }: { label: string; value: string; href?: string; icon: ReactNode }) {
  const children = <><span className="contact-icon" aria-hidden="true">{icon}</span><span className="contact-text"><span className="contact-label">{label}</span><span className="contact-value">{value}</span></span>{href && <FiArrowUpRight className="contact-arrow" aria-hidden="true" />}</>;
  return href ? <a className="contact-card" href={href} target={label === "Email" ? undefined : "_blank"} rel={label === "Email" ? undefined : "noopener noreferrer"}>{children}</a> : <div className="contact-card">{children}</div>;
}

function TagList({ items }: { items: string[] }) {
  return <ul className="tag-list">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
