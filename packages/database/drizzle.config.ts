import "dotenv/config";

import type { Config } from "drizzle-kit";

const getEnvVariable = (name: string) => {
  const value = process.env[name];
  if (value == null) throw new Error(`environment variable ${name} not found`);
  return value;
};

export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: getEnvVariable("DATABASE_URL"),
  },
} satisfies Config;
