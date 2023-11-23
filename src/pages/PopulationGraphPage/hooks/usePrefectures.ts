import { z } from "zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Prefectures } from "../../../resas-api/schema";
import { fetchPrefectures } from "../../../resas-api/fetchPrefectures";

type Prefs = z.infer<typeof Prefectures>["result"];

export const usePrefectures = (): Prefs => {
  const { data: prefs } = useSuspenseQuery({
    queryKey: ["prefectures"],
    queryFn: fetchPrefectures,
  });

  return prefs.result;
};
