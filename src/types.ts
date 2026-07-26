export type PageRoute = 'home' | 'about' | 'contact';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'ARCHIVED';
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillItem {
  name: string;
  level: number;
  category: 'ai' | 'backend' | 'frontend' | 'architecture';
  description: string;
  iconName?: string;
}

export interface ProjectCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  status: 'Production v1.0' | 'Roadmap v2.0' | 'Research';
  category: string;
}
