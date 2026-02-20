import { ReactNode } from "react";

export interface ProjectCardProps {
  name: string;
  subtitle: string;
  problem: string;
  description: string;
  features: string[];
  tags: string[];
  featured?: boolean;
  repoUrl: string;
}

export interface ContactCardProps {
  label: string;
  value: string;
}

export interface EducationCardProps {
  degree: string;
  institution: string;
  location: string;
  duration: string;
}

export interface SkillGroupProps {
  title: string;
  items: string[];
  highlight?: boolean;
}

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  accentWord?: string;
}

export interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  children?: (displayedText: string) => ReactNode;
}

export interface Section {
  id: string;
  label: string;
}

export interface RotatingIconProps {
  children: ReactNode;
  className?: string;
}

export interface BreathingCardProps {
  children: ReactNode;
  className?: string;
}

export interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  className?: string;
}