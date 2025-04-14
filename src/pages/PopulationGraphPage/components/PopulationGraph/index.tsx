import styles from "./PopulationGraph.module.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
  ReferenceLine,
} from "recharts";
import { useGraph } from "./hooks/useGraph";
import { getLineColor } from "./functions/getLineColor";
import { useDeferredValue } from "react";

type Props = {
  checkedPrefs: number[];
};

const PopulationGraph: React.FC<Props> = ({ checkedPrefs }) => {
  const deferredCheckedPrefs = useDeferredValue(checkedPrefs);
  const { selectedLabel, renderLabelTabBar, checkedPrefsWithNames, graphData } =
    useGraph(deferredCheckedPrefs);

  return (
    <div>
      {renderLabelTabBar()}
      <div className={styles.container}>
        <div
          className={
            checkedPrefs !== deferredCheckedPrefs
              ? styles.loading
              : styles.loaded
          }
        >
          読み込み中...
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={graphData.data}
          margin={{
            top: 90,
            right: 10,
            left: 30,
            bottom: 10,
          }}
        >
          {checkedPrefsWithNames.map((pref) => (
            <Line
              key={`graph-line-${pref.prefCode}`}
              type="linear"
              dataKey={pref.prefName}
              stroke={getLineColor(pref.prefCode)}
            />
          ))}
          <XAxis
            dataKey="year"
            angle={45}
            tickMargin={13}
            padding={{ left: 20, right: 20 }}
          >
            <Label value="年度" position="right" offset={10} />
          </XAxis>
          <YAxis>
            <Label
              value="人口数"
              angle={-90}
              position="insideTop"
              offset={-50}
            />
          </YAxis>
          <Tooltip
            labelFormatter={() => selectedLabel}
            formatter={(value: number) => `${value}人`}
          />
          {graphData.boundaryYear && (
            <ReferenceLine
              x={graphData.boundaryYear}
              stroke="#888888"
              label="以降推定値"
            />
          )}
          <Legend
            align="right"
            verticalAlign="top"
            layout="vertical"
            margin={{ left: 20, top: 30 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationGraph;
