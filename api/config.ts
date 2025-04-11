import { env } from "./env.js";

export const BASE_URL =
  "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1";

export const API_KEY = env.YUMEMI_API_KEY ?? "DUMMY_API_KEY";
