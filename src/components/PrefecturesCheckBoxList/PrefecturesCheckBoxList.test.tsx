import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { describe, it, afterEach, vi, expect } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import PrefecturesCheckBoxList from ".";

afterEach(() => {
  cleanup();
});

describe("PrefecturesCheckBoxList", () => {
  const mockHandleChange = vi.fn();
  const renderPrefectursCheckBoxList = () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<>Loding...</>}>
          <PrefecturesCheckBoxList
            checkedPrefs={[1]}
            onChange={mockHandleChange}
          />
        </Suspense>
      </QueryClientProvider>
    );
  };

  it("北海道のチェックボックスが表示されており、チェックされている", async () => {
    renderPrefectursCheckBoxList();

    const checkbox: HTMLInputElement = await screen.findByLabelText("北海道", {
      selector: "input",
    });

    const label = (() => {
      checkbox.labels;
      if (checkbox.labels === null) return null;
      return checkbox.labels[0];
    })();

    expect(label?.textContent).toBe("北海道");
    expect(checkbox.checked).toBe(true);
  });

  it("東京都のチェックボックスが表示されており、チェックされていない", async () => {
    renderPrefectursCheckBoxList();

    const checkbox: HTMLInputElement = await screen.findByLabelText("東京都", {
      selector: "input",
    });

    const label = (() => {
      checkbox.labels;
      if (checkbox.labels === null) return null;
      return checkbox.labels[0];
    })();

    expect(label?.textContent).toBe("東京都");
    expect(checkbox.checked).toBe(false);
  });

  it("大阪府のチェックボックスが表示されており、チェックされていない", async () => {
    renderPrefectursCheckBoxList();

    const checkbox: HTMLInputElement = await screen.findByLabelText("大阪府", {
      selector: "input",
    });

    const label = (() => {
      checkbox.labels;
      if (checkbox.labels === null) return null;
      return checkbox.labels[0];
    })();

    expect(label?.textContent).toBe("大阪府");
    expect(checkbox.checked).toBe(false);
  });

  it("北海道のチェックボックスがクリックされたときonChangeのコールバックが引数1で呼ばれる", async () => {
    const user = userEvent.setup();
    renderPrefectursCheckBoxList();

    const checkbox: HTMLInputElement = await screen.findByLabelText("北海道", {
      selector: "input",
    });

    await user.click(checkbox);
    expect(mockHandleChange).toHaveBeenCalled();
    expect(mockHandleChange).toBeCalledWith(1);
  });
});
