import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { API_KEY, BASE_URL } from "./config.js";
import { Prefectures, Error } from "./scheme.js";

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
