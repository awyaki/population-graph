import { Suspense } from "react";
import { usePrefecturesCheckBoxList } from "./hooks/usePrefecturesCheckBoxList";
import PopulationGraph from "../../components/PopulationGraph";
import Responsive from "../../layouts/TwoItemsResponsiveContainer";
import Container from "../../layouts/AppContainer";

const PopulationGraphPage: React.FC = () => {
  const { checkedPrefs, renderPrefecturesCheckBoxList } =
    usePrefecturesCheckBoxList();

  return (
    <Container>
      <h1>都道府県別人口構成グラフ</h1>
      <Responsive
        first={
          <Suspense fallback={<>Loading...</>}>
            {renderPrefecturesCheckBoxList()}
          </Suspense>
        }
        second={
          <Suspense fallback={<>Loading...</>}>
            <PopulationGraph checkedPrefs={checkedPrefs} />
          </Suspense>
        }
      />
    </Container>
  );
};

export default PopulationGraphPage;
