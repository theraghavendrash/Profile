export interface StatItem {
  label: string;
  value: number | string;
  suffix?: string;
  isNumeric?: boolean;
  decimals?: number;
}

export interface PersonalData {
  name: string;
  shortName: string;
  role: string;
  eyebrow: string;
  headlineWords: string[];
  bio: string;
  location: string;
  email: string;
  availability: string;
  stats: StatItem[];
  links: {
    github: string;
    linkedin: string;
    email: string;
    resume: string;
  };
}

export interface AboutPrinciple {
  code: string;
  title: string;
  desc: string;
}

export interface AboutData {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  principles: AboutPrinciple[];
}

export interface SkillItem {
  name: string;
  level: string;
  focus?: string;
  category?: string;
  tooltip?: string;
}

export interface SkillCategory {
  id?: string;
  name: string;
  desc: string;
  items: SkillItem[];
}

export interface SkillsData {
  eyebrow: string;
  title: string;
  categories: SkillCategory[];
}

export interface ProjectItem {
  number: string;
  id: string;
  featured: boolean;
  badge?: string | null;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  liveDemoUrl?: string | null;
  githubUrl?: string | null;
  isTeamProject?: boolean;
}

export interface MilestoneItem {
  period: string;
  role: string;
  place: string;
  description: string;
  tags: string[];
}

export interface JourneyData {
  eyebrow: string;
  title: string;
  milestones: MilestoneItem[];
}

export interface ContactData {
  eyebrow: string;
  title: string;
  subtitle: string;
  email: string;
  responseTime: string;
  timezone: string;
}

export interface PortfolioData {
  personal: PersonalData;
  about: AboutData;
  skills: SkillsData;
  projects: ProjectItem[];
  journey: JourneyData;
  contact: ContactData;
}

export declare const portfolioData: PortfolioData;
export default portfolioData;
