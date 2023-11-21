import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PopulationGraphPage from "./pages/PopulationGraphPage";
import ErrorPage from "./pages/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <QueryClientProvider client={queryClient}>
        <PopulationGraphPage />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
