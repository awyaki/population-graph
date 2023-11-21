import "./App.css";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePrefecturesCheckBoxList } from "./hooks/usePrefecturesCheckBoxList";
import PopulationGraph from "./components/PopulationGraph";
import Responsive from "./layouts/TwoItemsResponsiveContainer";
const queryClient = new QueryClient();

function App() {
  const { checkedPrefs, renderPrefecturesCheckBoxList } =
    usePrefecturesCheckBoxList();

  return (
    <QueryClientProvider client={queryClient}>
      {/* TODO: ErrorBoundaryを作る */}
      {/* TODO: Suspenseのフォールバックを作る */}
      <h1>都道府県別人口構成グラフ</h1>
      <Suspense fallback={<></>}>
        <Responsive
          first={renderPrefecturesCheckBoxList()}
          second={<PopulationGraph checkedPrefs={checkedPrefs} />}
        />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
