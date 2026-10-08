import bioData from '@/data/bio.json';
import servicesData from '@/data/services.json';
import projectsData from '@/data/projects.json';
import skillsData from '@/data/skills.json';

export interface BioData {
  tagline: string;
  headline: string;
  name: string;
  role: string;
  subtext: string;
  hero_photo: string;
  cv_file: string;
  experience_years: string;
  clients_count: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    whatsapp: string;
  };
  about_photo: string;
  apps_shipped: string;
  about_title: string;
  about_paragraph_1: string;
  niche_statement: string;
  about_paragraph_2: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  marquee: string[];
}

export interface ServiceData {
  id: string;
  icon: string;
  icon_bg: string;
  title: string;
  description: string;
  features: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  featured: boolean;
  image: string;
  tags: string[];
  description: string;
  outcome: string;
  demo_url: string;
  source_url: string;
}

export interface SkillItem {
  name: string;
  icon: string;
  width: number;
}

export interface SkillGroup {
  label: string;
  items: SkillItem[];
}

export interface ToolItem {
  name: string;
  image: string;
}

export interface SkillsData {
  groups: SkillGroup[];
  tools: ToolItem[];
}

export function getBioData(): BioData {
  return bioData as BioData;
}

export function getServicesData(): ServiceData[] {
  return servicesData as ServiceData[];
}

export function getProjectsData(): ProjectData[] {
  return projectsData as unknown as ProjectData[];
}

export function getSkillsData(): SkillsData {
  return skillsData as SkillsData;
}
