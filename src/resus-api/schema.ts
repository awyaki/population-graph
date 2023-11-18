import { z } from "zod";

/**
 * The following code reference to the spec of RESUS API.
 * [仕様詳細](https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html)
 * */

export const Error = z
  .object({
    statusCode: z.string().optional(),
    message: z.string().nullable(),
    description: z.string().optional(),
  })
  .or(z.string());

