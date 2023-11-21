import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { cleanup, screen, renderHook, render } from "@testing-library/react";
import { usePrefecturesCheckBoxList } from "./usePrefecturesCheckBoxList.tsx";

describe("usePrefecturesCheckBoxList", () => {
  it("東京都のチェックボックスをクリックするとチェック状態と未チェック状態が切り替わる", async () => {
    const user = userEvent.setup();
    const { result } = renderHook(usePrefecturesCheckBoxList);

    const queryClient = new QueryClient();
    const TestedComponent = () => {
      return (
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<>Loading...</>}>
            {result.current.renderPrefecturesCheckBoxList()}
          </Suspense>
        </QueryClientProvider>
      );
    };

    const { rerender } = render(<TestedComponent />);

    const tokyoCheckbox: HTMLInputElement = await screen.findByLabelText(
      "東京都",
      {
        selector: "input",
      }
    );

    // 初め東京都のチェックボックスは未チェック状態である
    expect(tokyoCheckbox.checked).toBe(false);

    // チェックボックスを1回クリックするとチェック状態となる
    await user.click(tokyoCheckbox);
    rerender(<TestedComponent />);
    expect(tokyoCheckbox.checked).toBe(true);

    // さらにチェック状態の東京都のチェックボックスを1回クリックすると未チェック状態になる
    await user.click(tokyoCheckbox);
    rerender(<TestedComponent />);
    expect(tokyoCheckbox.checked).toBe(false);
    cleanup();
  });
});
