import { z } from "zod";
import { useMemo } from "react";
import { usePrefectures } from "../../../hooks/usePrefectures";
import { usePopulation } from "./usePopulation";
import { useGetGraphData } from "./useGetGraphData";
import { useCheckedPrefsWithNames } from "./useCheckedPrefsWithNames";
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
  const checkedPrefsWithNames = useCheckedPrefsWithNames(checkedPrefs, prefs);

  return {
    selectedLabel,
    graphData,
    checkedPrefsWithNames,
    renderLabelTabBar,
  };
};
