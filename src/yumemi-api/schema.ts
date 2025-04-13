import { z } from "zod";

export const YumemiApiError = z
  .object({
    statusCode: z.string().optional(),
    message: z.string().nullable(),
    description: z.string().optional(),
  })
  .or(z.string());

export const Prefectures = z.object({
  message: z.null(),
  result: z
    .object({
      prefCode: z.number(),
      prefName: z.string(),
    })
    .array(),
});

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
