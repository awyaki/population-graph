import { z } from "zod";

const Env = z.object({
  RESUS_API_KEY: z.string().optional(),
});

export const env = Env.parse(process.env);
