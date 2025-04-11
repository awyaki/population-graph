import { z } from "zod";

const Env = z.object({
  YUMEMI_API_KEY: z.string().optional(),
});

export const env = Env.parse(process.env);
