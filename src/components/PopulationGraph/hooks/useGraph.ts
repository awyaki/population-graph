import { z } from "zod";
import { useMemo } from "react";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { fetchPrefectures } from "../../../resas-api/fetchPrefectures";
import { fetchPopulation } from "../../../resas-api/fetchPopulation";
import { Prefectures, Population } from "../../../resas-api/schema";
import { translateIntoGraphData } from "../functions/translateIntoGraphData";
import { useLabelTabBar } from "./useLabelTabBar";

type Prefs = z.infer<typeof Prefectures>["result"];

type Label = z.infer<typeof Population>["result"]["data"][number]["label"];

export const useGraph = (
  checkedPrefs: number[]
): {
  selectedLabel: Label;
  checkedPrefsWithNames: Prefs;
  graphData: ReturnType<typeof translateIntoGraphData>;
  renderLabelTabBar: () => React.ReactNode;
} => {
  const { selectedLabel, renderLabelTabBar } = useLabelTabBar();
  // TODO: usePrefecturesとして切り出す
  const { data: prefs } = useSuspenseQuery({
    queryKey: ["prefectures"],
    queryFn: fetchPrefectures,
  });

  const results = useSuspenseQueries({
    queries: checkedPrefs.map((prefCode) => ({
      queryKey: ["population", prefCode],
      queryFn: () => fetchPopulation(prefCode),
    })),
  });

  const graphData = useMemo(() => {
    return translateIntoGraphData(
      checkedPrefs,
      prefs.result,
      results.map((v) => v.data),
      selectedLabel
    );
  }, [checkedPrefs, prefs, results, selectedLabel]);

  const checkedPrefsWithNames = useMemo(() => {
    const prefsMap = new Map<number, string>(
      prefs.result.map(({ prefCode, prefName }) => {
        return [prefCode, prefName];
      })
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

  return {
    selectedLabel,
    graphData,
    checkedPrefsWithNames,
    renderLabelTabBar,
  };
};
