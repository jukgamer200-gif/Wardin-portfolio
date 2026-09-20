export type PortfolioTemplate = 'neon-obsidian' | 'minecraft-voxel' | 'cyber-terminal' | 'discord-profile';

export type BackgroundStyle = 'minecraft-gif' | 'minecraft-rain-gif' | 'shader-night' | 'sculk-sanctum' | 'floating-blocks';

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: { name: string; level: number; tag?: string }[];
}

export interface HostingService {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  specs: string[];
  popular?: boolean;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics: string;
  link?: string;
  role: string;
}

export interface ClientReview {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  content: string;
  service: string;
  date: string;
  rating: number;
}
