import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  boolean,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  onboarded: boolean("onboarded").default(false),
  avatarUrl: text("avatar_url"), // Utilisation d'un nom de colonne plus clair
  preferredGenre: jsonb("preferred_genre"),
  aiAssistanceEnabled: boolean("ai_assistance_enabled").default(true), // Correction de "aI" en "ai"
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Books table
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  genre: varchar("genre", { length: 100 }),
  language: varchar("language", { length: 50 }),
  description: text("description"),
  coverImage: varchar("cover_image", { length: 255 }),
  content: jsonb("content"), // Assure-toi que le type de contenu soit approprié
  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  content: text("content").notNull(),
  order: integer("order").default(0),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations (si tu veux les définir)
// export const userRelations = relations(users, ({ many }) => ({
//   books: many(books), // Un utilisateur peut avoir plusieurs livres
// }));

// export const bookRelations = relations(books, ({ one }) => ({
//   author: one(users, { fields: [books.authorId], references: [users.id] }), // Un livre a un auteur
// }));

// export const chapterRelations = relations(chapters, ({ one }) => ({
//   chapters: one(books, { fields: [chapters.bookId], references: [books.id] }),
// }));


export const aiSuggestions = pgTable("ai_suggestions", {
  id: serial("id").primaryKey(),
  chapterId: serial("chapter_id").references(() => chaptersai.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const booksai = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  genre: varchar("genre", { length: 100 }),
  language: varchar("language", { length: 50 }),
  description: text("description"),
  coverImage: varchar("cover_image", { length: 255 }),
  userId: varchar("user_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const chaptersai = pgTable("chapters", {
  id: serial("id").primaryKey(),
  bookId: serial("book_id").references(() => books.id),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  order: serial("order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})