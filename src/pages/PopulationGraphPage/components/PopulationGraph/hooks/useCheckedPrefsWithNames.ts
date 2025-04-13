import { z } from "zod";
import { useMemo } from "react";
import { Prefectures } from "../../../../../yumemi-api/schema";

type Prefs = z.infer<typeof Prefectures>["result"];

export const useCheckedPrefsWithNames = (
  checkedPrefs: number[],
  prefs: Prefs,
) => {
  const checkedPrefsWithNames = useMemo(() => {
    const prefsMap = new Map<number, string>(
      prefs.map(({ prefCode, prefName }) => {
        return [prefCode, prefName];
      }),
    );

    return checkedPrefs.map((prefCode) => {
      const prefName = prefsMap.get(prefCode);

      // checkedPrefsの要素の値はprefCodeである。
      // prefsは全てのprefCodeにそれぞれ対応するオブジェクトを持つため
      // prefsMap.get(prefCode)の値がundefinedになることはない
      if (prefName === undefined) throw new Error("エラーが発生しました");

      return { prefCode, prefName };
    });
  }, [checkedPrefs, prefs]);

  return checkedPrefsWithNames;
};
