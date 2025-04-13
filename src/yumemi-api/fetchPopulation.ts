import { Population } from "./schema";
import { baseUrl } from "./config";

export const fetchPopulation = async (prefCode: number) => {
  const res = await fetch(`${baseUrl}/api/population?prefCode=${prefCode}`);

  if (!res.ok) throw new Error("データの取得に失敗しました");

  const _data = (await res.json()) as unknown;

  const result = Population.safeParse(_data);

  if (result.success) return result.data.result;

  // _dataがPopulationにパースできないとき
  throw new Error("データの取得に失敗しました");
};
