/* These TypeScript interfaces are defining the structure of various data types used in a hypothetical
application. Here's a breakdown of each interface: */
export interface User {
  id: string;
  name: string;
  email: string;
  image: string ;
  onboarded: boolean
  password_hash: string;
  preferredGenre: string | null;
  aiAssistanceEnabled: boolean;
  created_at: string;
  preferences: Record<string, unknown>;
  updated_at: string;
}
export interface Book {
  id: number;
  userId: string;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  progress: string;
  content: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chapter {
  id: number;
  bookId?: number;
  title: string;
  content: string;
  orderIndex?: number;
  createdAt?: Date;
  updatedAt?: Date;
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
    image: string
    onboarded: boolean
  };
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}
