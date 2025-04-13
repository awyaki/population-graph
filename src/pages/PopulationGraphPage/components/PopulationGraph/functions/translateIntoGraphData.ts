import { z } from "zod";
import { Population, Prefectures } from "../../../../../yumemi-api/schema";

export type Population = z.infer<typeof Population>;

export type Label = Population["result"]["data"][number]["label"];

export type PopPaylad = Population["result"];

export type Prefectures = z.infer<typeof Prefectures>;

export type PrefsPaylod = Prefectures["result"];

export type GraphData = {
  boundaryYear: number | null;
  data: ({
    label: Label;
    year: number;
  } & {
    [k in string]: number | string;
  })[];
};

/**
 * translateIntoGraphDataは
 * RESAS APIのレスポンスデータからRechartsのグラフに適したデータへと変換する関数である
 *
 * 返り値の例
 *
 *   {
 *     label: "総人口",
 *     北海道: 1000,
 *     東京都: 2000,
 *     year: 2023,
 *   },
 *   {
 *     label: "総人口",
 *     population: 2000,
 *     北海道: 1200,
 *     東京都: 2200,
 *     year: 2024,
 *   },
 *   {
 *     label: "総人口",
 *     北海道: 1200,
 *     東京都: 2200,
 *     year: 2025,
 *   },
 **/

export const translateIntoGraphData = (
  prefCodes: number[],
  prefs: PrefsPaylod,
  populations: PopPaylad[],
  label: Label,
): GraphData => {
  // 以降の処理においてprefCodesとpopulationsの長さが等しいことを保証する
  if (prefCodes.length !== populations.length)
    throw new Error("エラーが発生しました");

  if (prefCodes.length === 0) return { boundaryYear: null, data: [] };

  const prefNameMap = new Map(
    prefs.map(({ prefCode, prefName }) => [prefCode, prefName]),
  );

  const boundaryYear = populations[0].boundaryYear;
  // [
  //  Map() 大阪府のデータ
  //  Map() 東京都のデータ
  //  ...
  // ]
  const preGraphData: Map<string, GraphData["data"][number]>[] = [];

  // 都道府県数は47なので
  // 最大47回のループ
  populations.forEach((population, index) => {
    const prefName = prefNameMap.get(prefCodes[index]);
    if (prefName === undefined) throw new Error("エラーが発生しました");

    const prefDataMap = new Map<string, GraphData["data"][number]>([]);

    // データはlabelごとに格納されておりlabelの種類は4種類なので
    // 4回のループ
    population.data.forEach(({ label, data }) => {
      // 1980-2045の5年ごとのデータが格納されているので(2045 - 1980)/5より
      // 13回のループ
      data.forEach(({ value, year }) => {
        prefDataMap.set(`${label}-${year}`, { label, year, [prefName]: value });
      });
    });

    preGraphData.push(new Map(prefDataMap));
  });

  const base = Array.from(preGraphData[0]).map((v) => v[1]);

  /*
   * baseをもとにlabalとyearが一致するGraphDataのオブジェクトをマージしていく
   * つまり
   *
   * { label: '総人口', year: 1960, '東京都': 9683802 }
   * { label: '総人口', year: 1960, '大阪府': 4206313 }
   *
   * の二つのオブジェクトを次のようにマージする
   *
   * { label: '総人口', year: 1960, '東京都': 9683802, '大阪府': 4206313 },
   * */

  const result = base
    .reduce((acc: GraphData["data"], curr) => {
      const { label, year } = curr;
      const element: GraphData["data"][number] = preGraphData.reduce(
        (acc1, currMap) => {
          const data = currMap.get(`${label}-${year}`);

          if (data === undefined) return { ...acc1 };

          // dataがあればマージする
          return { ...acc1, ...data };
        },
        { label, year },
      );

      return acc.concat(element);
    }, [])
    // labelでフィルターしたものを返す
    .filter((v) => v.label === label);

  return { boundaryYear, data: result };
};
