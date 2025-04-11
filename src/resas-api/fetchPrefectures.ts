import { z } from "zod";
import { Prefectures } from "./schema";
import { baseUrl } from "./config";

type Prefectures = z.infer<typeof Prefectures>;

export const fetchPrefectures = async (): Promise<Prefectures> => {
  const res = await fetch(`${baseUrl}/api/prefectures`);

  if (!res.ok) throw new Error("データの取得に失敗しました");

  const _data = (await res.json()) as unknown;

  const result = Prefectures.safeParse(_data);

  if (result.success) return result.data;

  // _dataがPrefecturesにパースできないとき
  throw new Error("データの取得に失敗しました");
};
