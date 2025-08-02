import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
          enum: ["admin", "user"],
        },
      },
    }),
  ],
  baseURL: import.meta.env.VITE_SERVER_URL,
});
