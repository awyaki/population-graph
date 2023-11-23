import { z } from "zod";
import { useMemo } from "react";
import { usePrefectures } from "../../../hooks/usePrefectures";
import { usePopulation } from "./usePopulation";
import { useGetGraphData } from "./useGetGraphData";
import { Prefectures, Population } from "../../../../../resas-api/schema";
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
  const prefs = usePrefectures();
  const population = usePopulation(checkedPrefs);
  const graphData = useGetGraphData(
    checkedPrefs,
    prefs,
    population,
    selectedLabel
  );

  const checkedPrefsWithNames = useMemo(() => {
    const prefsMap = new Map<number, string>(
      prefs.map(({ prefCode, prefName }) => {
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
