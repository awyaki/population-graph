import { z } from "zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Prefectures } from "../../../yumemi-api/schema";
import { fetchPrefectures } from "../../../yumemi-api/fetchPrefectures";

type Prefs = z.infer<typeof Prefectures>["result"];

export const usePrefectures = (): Prefs => {
  const { data: prefs } = useSuspenseQuery({
    queryKey: ["prefectures"],
    queryFn: fetchPrefectures,
  });

  return prefs.result;
};
