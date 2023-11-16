import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { API_KEY, BASE_URL } from "./config.js";
import { Population, Error } from "./scheme.js";

const ApiResponse = z.union([Population, Error]);

type ApiResponse = z.infer<typeof ApiResponse>;

const fetchPopulation = async (prefCode: number): Promise<ApiResponse> => {
  const response = await fetch(
    `${BASE_URL}/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );

  const _data = (await response.json()) as unknown;

  const data = ApiResponse.parse(_data);
  return data;
};

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!req.url) return res.status(400);
  const url = new URL(req.url, `http://${req.headers.host}`);

  const { searchParams } = url;

  const prefCode = searchParams.get("prefCode");

  if (prefCode === null) return res.status(404);

  const result = await fetchPopulation(Number(prefCode));
  return res.json(result);
};
