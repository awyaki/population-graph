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
  result: z
    .object({
      prefCode: z.number(),
      prefName: z.string(),
    })
    .array(),
});

// [人口構成](https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html)

const Data = z.discriminatedUnion("label", [
  z.object({
    label: z.literal("総人口"),
    data: z
      .object({
        //labelが総人口のときに限りrateプロパティが存在しない
        year: z.number(),
        value: z.number(),
      })
      .array(),
  }),
  z.object({
    label: z.literal("年少人口"),
    data: z
      .object({
        year: z.number(),
        value: z.number(),
        rate: z.number(),
      })
      .array(),
  }),
  z.object({
    label: z.literal("生産年齢人口"),
    data: z
      .object({
        year: z.number(),
        value: z.number(),
        rate: z.number(),
      })
      .array(),
  }),
  z.object({
    label: z.literal("老年人口"),
    data: z
      .object({
        year: z.number(),
        value: z.number(),
        rate: z.number(),
      })
      .array(),
  }),
]);

export const Population = z.object({
  message: z.null(),
  result: z.object({
    boundaryYear: z.number(),
    data: Data.array(),
  }),
});
