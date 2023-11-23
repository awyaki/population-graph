import { z } from "zod";
import { useMemo } from "react";
import { translateIntoGraphData } from "../functions/translateIntoGraphData";
import { Population, Prefectures } from "../../../../../resas-api/schema";

type Prefs = z.infer<typeof Prefectures>["result"];
type Population = z.infer<typeof Population>["result"];
type Label = z.infer<typeof Population>["result"]["data"][number]["label"];
export const useGetGraphData = (
  checkedPrefs: number[],
  prefs: Prefs,
  population: Population[],
  selectedLabel: Label
) => {
  const graphData = useMemo(() => {
    return translateIntoGraphData(
      checkedPrefs,
      prefs,
      population,
      selectedLabel
    );
  }, [checkedPrefs, prefs, population, selectedLabel]);

  return graphData;
};
