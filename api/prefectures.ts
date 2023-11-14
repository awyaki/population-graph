import type { VercelRequest, VercelResponse } from "@vercel/node";
import { env } from "./env.js";
import { z } from "zod";

/**
 * The following code reference to the spec of RESUS API.
 * [仕様詳細](https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html)
 * [人口構成](https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html)
 * */

const BASE_URL = "https://opendata.resas-portal.go.jp/api/v1";

const API_KEY = env.RESUS_API_KEY;

const Prefectures = z.object({
  message: z.null(),
  result: z.optional(
    z
      .object({
        prefCode: z.number(),
        prefName: z.string(),
      })
      .array()
  ),
});

const Error = z
  .object({
    statusCode: z.string().optional(),
    message: z.string().nullable(),
    description: z.string().optional(),
  })
  .or(z.string());

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
