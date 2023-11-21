import { useState, useCallback } from "react";
import PrefecturesCheckBoxList from "../components/PrefecturesCheckBoxList";

export const usePrefecturesCheckBoxList = (): {
  checkedPrefs: number[];
  renderPrefecturesCheckBoxList: () => React.ReactNode;
} => {
  const [checkedPrefs, setCheckedPrefs] = useState<number[]>([]);

  // 都道府県のチェック状態を切り替える関数
  const handleChange = useCallback((prefCode: number) => {
    setCheckedPrefs((curr) => {
      const index = curr.findIndex((code) => code === prefCode);
      // prefCodeが存在するときprefCodeをcheckedPrefsから除去する
      if (index !== -1) return curr.filter((code) => code !== prefCode);

      // prefCodeが存在しないときprefCodeをcheckedPrefsに追加する
      return curr.concat(prefCode);
    });
  }, []);

  const renderPrefecturesCheckBoxList = useCallback(() => {
    return (
      <PrefecturesCheckBoxList
        checkedPrefs={checkedPrefs}
        onChange={handleChange}
      />
    );
  }, [handleChange, checkedPrefs]);

  return { checkedPrefs, renderPrefecturesCheckBoxList };
};
