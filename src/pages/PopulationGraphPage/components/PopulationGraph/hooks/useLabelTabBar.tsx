import { z } from "zod";
import { Population } from "../../../../../yumemi-api/schema";
import { useState, useCallback, useMemo } from "react";
import { TabBar } from "../components/TabBar";
import { TabItem } from "../components/TabItem";

type Label = z.infer<typeof Population>["result"]["data"][number]["label"];

const isLabel = (s: string): s is Label => {
  return (
    s === "総人口" ||
    s === "年少人口" ||
    s === "生産年齢人口" ||
    s === "老年人口"
  );
};

const parseIntoLabel = (s: string): Label => {
  if (!isLabel(s)) throw new Error("エラーが発生しました");
  return s;
};

export const useLabelTabBar = (): {
  selectedLabel: Label;
  renderLabelTabBar: () => React.ReactNode;
} => {
  const [selectedLabel, setSelectedLabel] = useState<Label>("総人口");

  const labels = useMemo(() => {
    return ["総人口", "年少人口", "生産年齢人口", "老年人口"] as const;
  }, []);

  const handleClick = useCallback((tabId: string) => {
    const label = parseIntoLabel(tabId);
    setSelectedLabel(label);
  }, []);

  const renderLabelTabBar = useCallback(() => {
    return (
      <TabBar>
        {labels.map((label) => (
          <TabItem
            key={label}
            id={label}
            text={label}
            selected={selectedLabel === label}
            onClick={handleClick}
          />
        ))}
      </TabBar>
    );
  }, [labels, handleClick, selectedLabel]);

  return {
    selectedLabel,
    renderLabelTabBar,
  };
};
