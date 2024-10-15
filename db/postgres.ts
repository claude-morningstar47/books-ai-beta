import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is not set");
}
const client = new Client({
  connectionString: process.env.POSTGRES_URL,
});

await client.connect();
export const db = drizzle(client, { schema: schema });
