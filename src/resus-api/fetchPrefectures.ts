import { Prefectures } from "./schema";
import { baseUrl } from "./config";

export const fetchPrefectures = async () => {
  const res = await fetch(`${baseUrl}/api/prefectures`);

  if (!res.ok) throw new Error("データの取得に失敗しました");

  const _data = (await res.json()) as unknown;

  const result = Prefectures.safeParse(_data);

  if (result.success) return result.data.result;

  // _dataがPrefecturesにパースできないとき
  throw new Error("データの取得に失敗しました");
};
