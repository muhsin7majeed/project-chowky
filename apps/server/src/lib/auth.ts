import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { db } from "../db";
import * as schema from "../db/schema/auth";

// biome-ignore lint/suspicious/noExplicitAny: No idea what is happening here
export const auth = betterAuth<any>({
  plugins: [admin()],
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",

    schema: schema,
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || ""],
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});
