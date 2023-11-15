import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const enableMocking = async () => {
  if (process.env.NODE_ENV != "development") return;

  const { worker } = await import("./mocks/browser.ts");

  return worker.start();
};

enableMocking()
  .then(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((e) => {
    console.error(e);
  });
