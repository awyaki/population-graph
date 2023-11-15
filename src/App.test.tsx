import { expect, it, describe } from "vitest";
import { renderHook, cleanup, waitFor } from "@testing-library/react";
import { usePrefectures } from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

const add = (a: number, b: number) => a + b;

describe("add function", () => {
  it("adds 1 + 2 to equal 3", () => {
    console.log("test 1");
    expect(add(1, 2)).toBe(3);
  });
});

it("test for testing react hooks", async () => {
  const client = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  const { result } = renderHook(() => usePrefectures(), { wrapper });
  await waitFor(() => {
    // This test will be failed, though the test should run correctly.
    expect(result.current).toMatchObject({ test: "" });
    console.log("result current", result.current);
  });
  cleanup();
});
