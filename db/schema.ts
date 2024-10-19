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

// Table users avec un ID de type UUID
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),  // UUID avec génération automatique
  name: text("name").notNull().unique(),  // Contrainte d'unicité
  email: text("email").notNull().unique(),  // Contrainte d'unicité
  password_hash: text("password_hash").notNull(),
  image: text("image"),
  preferredGenre: text('preferred_genre'),
  aiAssistanceEnabled: boolean('ai_assistance_enabled').default(true),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  onboarded: boolean('onboarded').default(false),
  // Indique si l'utilisateur a complété l'onboarding
  preferences: jsonb("preferences").default('{}'),  // Valeur par défaut JSON
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// Table books avec un ID auto-incrémenté
export const books = pgTable('books', {
  id: integer('id').primaryKey(),  // Auto-incrément pour les livres
  userId: uuid('user_id').references(() => users.id),  // Référence à la table users
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }),
  coverImageUrl: varchar('cover_image_url', { length: 500 }),
  progress: integer('progress').default(0),  // Progression de l'écriture
  content: text('content'),
  isPublished: boolean('is_published').default(false),
  created_at: timestamp('created_at').defaultNow(),  // Création
  updated_at: timestamp('updated_at').defaultNow(),  // Mise à jour
});

// Table chapters avec un ID auto-incrémenté
export const chapters = pgTable('chapters', {
  id: integer('id').primaryKey(),  // Auto-incrément pour les chapitres
  bookId: integer('book_id').references(() => books.id),  // Référence à la table books
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),  // Contenu du chapitre
  orderIndex: integer('order_index').notNull().default(0),  // Index d'ordre des chapitres
  created_at: timestamp('created_at').defaultNow(),  // Création
  updated_at: timestamp('updated_at').defaultNow(),  // Mise à jour
});



// export const echapter = pgTable('chapters', {
//   id: serial('id').primaryKey(),
//   ebookId: serial('ebook_id').references(() => ebooks.id),
//   title: varchar('title', { length: 255 }).notNull(),
//   content: text('content'),
//   orderIndex: serial('order_index').notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// })





// export const chats = pgTable("chats", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   userId: uuid("user_id").references(()=> users.id),
//   content: text("content").notNull(),
//   sharePath: varchar("share_path", { length: 255 }),
//   createdAt: timestamp("created_at").defaultNow(),
// });




// export const ebooks = pgTable('ebooks', {
//   id: serial('id').primaryKey(),
//   title: varchar('title', { length: 255 }).notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// })
