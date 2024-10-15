export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  onboarded: boolean;
  salt: string
  preferences?: Record<string, unknown>;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: string;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  authorId: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  bookId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
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
    onboarded?: string;
  };
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}
