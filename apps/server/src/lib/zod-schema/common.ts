import { z } from "zod";

export const orderBySchema = z.object({
  column: z.string(),
  direction: z.enum(["asc", "desc"]),
});
