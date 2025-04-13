import { z } from "zod";
import { useSuspenseQueries } from "@tanstack/react-query";
import { fetchPopulation } from "../../../../../yumemi-api/fetchPopulation";
import { Population } from "../../../../../yumemi-api/schema";

type Population = z.infer<typeof Population>["result"];

export const usePopulation = (checkedPrefs: number[]): Population[] => {
  const results = useSuspenseQueries({
    queries: checkedPrefs.map((prefCode) => ({
      queryKey: ["population", prefCode],
      queryFn: () => fetchPopulation(prefCode),
    })),
  });

  return results.map((v) => v.data);
};
