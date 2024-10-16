import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./migrations",  
  dialect: "postgresql",
  dbCredentials: {
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "bookia",
    ssl: false,
  },
} satisfies Config;



