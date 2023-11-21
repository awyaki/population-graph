import { Suspense } from "react";
import { usePrefecturesCheckBoxList } from "./hooks/usePrefecturesCheckBoxList";
import PopulationGraph from "../../components/PopulationGraph";
import Responsive from "../../layouts/TwoItemsResponsiveContainer";
import Container from "../../layouts/AppContainer";
import QueryErrorBoundary from "./components/QueryErrorBoundary";

const PopulationGraphPage: React.FC = () => {
  const { checkedPrefs, renderPrefecturesCheckBoxList } =
    usePrefecturesCheckBoxList();

  return (
    <Container>
      <h1>都道府県別人口構成グラフ</h1>
      <Responsive
        first={
          <QueryErrorBoundary>
            <Suspense fallback={<>Loading...</>}>
              {renderPrefecturesCheckBoxList()}
            </Suspense>
          </QueryErrorBoundary>
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
