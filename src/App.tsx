import "./App.css";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

// When the app is running on development
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Prefectures />
    </QueryClientProvider>
  );
}

export default App;

export const usePrefectures = () => {
  return useQuery("prefectures", fetchPrefectures);
};

const Prefectures: React.FC = () => {
  const query = usePrefectures();
  console.log("query data", query.data);
  return <>Hello world</>;
};

const baseUrl = import.meta.env.MODE === "test" ? "http://localhost:3000" : "";

const fetchPrefectures = async () => {
  const res = await fetch(baseUrl + "/api/prefectures");
  const data = (await res.json()) as unknown;
  return data;
};
