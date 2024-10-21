// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  onboarded?: boolean;
  avatarUrl?: string;
  preferredGenre?: Preference;
  aiAssistanceEnabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Preference {
  follow: string[]
  genre: string[]
  expertise: string[]
}

// Book interface
export interface Book {
  id: number;
  title: string;
  genre?: string;
  language?: string;
  description?: string;
  entrepreneurialInsights:string
  coverImage?: string;
  content: Chapter[]; // Liste de chapitres
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Chapter interface
export interface Chapter {
  id: number;
  title: string;
  content: string;
  order: number;
}

export interface Chat {
  id: string;
  userId: string;
  content: string;
  sharePath: string | null;
  createdAt: Date;
}
export interface Session {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}
