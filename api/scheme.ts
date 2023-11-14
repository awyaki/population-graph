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

// [都道府県一覧](https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html)

export const Prefectures = z.object({
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
