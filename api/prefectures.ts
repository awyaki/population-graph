import type { VercelRequest, VercelResponse } from "@vercel/node";
import { env } from "./env.js";
import { z } from "zod";
import { Prefectures, Error } from "./scheme.js";

const BASE_URL = "https://opendata.resas-portal.go.jp/api/v1";

const API_KEY = env.RESUS_API_KEY;

const ApiResponse = z.union([Prefectures, Error]);

type ApiResponse = z.infer<typeof ApiResponse>;

const fetchPrefectures = async (): Promise<ApiResponse> => {
  const response = await fetch(`${BASE_URL}/prefectures`, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });

  const _data = (await response.json()) as unknown;

  const data = ApiResponse.parse(_data);
  return data;
};

export default async (_req: VercelRequest, res: VercelResponse) => {
  const result = await fetchPrefectures();
  return res.json(result);
};
