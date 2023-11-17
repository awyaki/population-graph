import { useMemo } from "react";
import styles from "./styles.module.css";

type Pref = {
  prefCode: number;
  prefName: string;
};

type Props = {
  prefs: Pref[];
  checkedPrefs: number[];
  onChange: (prefCode: number) => void;
};

const PrefecturesCheckBoxList: React.FC<Props> = (props) => {
  const { prefs, onChange, checkedPrefs } = props;

  const checkedPrefsSet = useMemo(() => {
    return new Set(checkedPrefs);
  }, [checkedPrefs]);

  return (
    <ul className={styles.wrapper}>
      {prefs.map((pref) => (
        <li key={pref.prefCode}>
          <input
            id={`pref-checkbox-${pref.prefCode}`}
            type="checkbox"
            checked={checkedPrefsSet.has(pref.prefCode)}
            onChange={() => {
              onChange(pref.prefCode);
            }}
          />
          <label
            className={styles["checkbox-label"]}
            htmlFor={`pref-checkbox-${pref.prefCode}`}
          >
            {pref.prefName}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default PrefecturesCheckBoxList;
