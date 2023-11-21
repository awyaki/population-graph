import { env } from "./env.js";

export const BASE_URL = "https://opendata.resas-portal.go.jp/api/v1";

export const API_KEY = env.RESAS_API_KEY ?? "DUMMY_API_KEY";
