import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  salt: text("salt").notNull(),
  onboarded: boolean("onboarded").default(false), // Indique si l'utilisateur a complété l'onboarding
  preferences: jsonb("preferences").default('{}'), // Stocke les préférences d'onboarding en JSON
  avatar_url: text("avatar_url"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const books = pgTable('books', {
  id: uuid('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }),
  coverImageUrl: varchar('cover_image_url', { length: 500 }),
  authorId: uuid('author_id').references(() => users.id),  // Référence à l'auteur (user)
  isPublished: boolean('is_published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const chapters = pgTable('chapters', {
  id: uuid('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),  // Contenu du chapitre (peut être Markdown ou HTML)
  bookId: uuid('book_id').references(() => books.id),  // Référence au livre
  order: integer('order').notNull(),  // Ordre des chapitres dans le livre
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});


export const chats = pgTable("chats", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(()=> users.id),
  content: text("content").notNull(),
  sharePath: varchar("share_path", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});
