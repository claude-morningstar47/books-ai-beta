// import type { Config } from "drizzle-kit";

// export default {
//   schema: "./db/schema.ts",
//   out: "./migrations",  
//   dialect: "postgresql",
//   dbCredentials: {
//     user: "postgres",
//     password: "postgres",
//     host: "localhost",
//     port: 5432,
//     database: "bookai",
//     ssl: false,
//   },
// } satisfies Config;




// import type { Config } from "drizzle-kit";

// export default {
//   schema: "./db/schema.ts",
//   out: "./migrations",  
//   dialect: "postgresql",
//   dbCredentials: {
//     host: process.env.DB_HOST || "localhost",
//     port: Number(process.env.DB_PORT) || 5432,
//     user: process.env.DB_USER || "postgres",
//     password: process.env.DB_PASSWORD || "postgres",
//     database: process.env.DB_NAME || "bookai",
//     ssl: false,
//   },
// } satisfies Config;


import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./migrations",  
  dialect: "postgresql",
  dbCredentials: {
    host: "ep-sweet-scene-a6izjhfm.us-west-2.retooldb.com",
    port: 5432,
    user: "retool",
    password: "9grCuTizsHF4",
    database: "retool",
    ssl: { rejectUnauthorized: false }  // Utilisation de SSL avec des options adaptées
  },
} satisfies Config;
