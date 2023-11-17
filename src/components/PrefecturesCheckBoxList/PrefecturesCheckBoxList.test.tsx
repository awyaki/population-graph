import { describe, it, afterEach, vi, expect } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import PrefecturesCheckBoxList from ".";

afterEach(() => {
  cleanup();
});

describe("PrefecturesCheckBoxList", () => {
  const mockHandleChange = vi.fn();
  /*
   * RESUS API 都道府県一覧が返却するデータのうち
   * 北海道、東京都、大阪府のデータを用いてテストを行う
   * */
  const renderPrefectursCheckBoxList = () => {
    render(
      <PrefecturesCheckBoxList
        prefs={[
          {
            prefCode: 1,
            prefName: "北海道",
          },
          { prefCode: 13, prefName: "東京都" },
          { prefCode: 27, prefName: "大阪府" },
        ]}
        checkedPrefs={[1]}
        onChange={mockHandleChange}
      />
    );
  };

  it("北海道のチェックボックスが表示されており、チェックされている", () => {
    renderPrefectursCheckBoxList();

    const checkbox: HTMLInputElement = screen.getByLabelText("北海道", {
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

  it("東京都のチェックボックスが表示されており、チェックされていない", () => {
    renderPrefectursCheckBoxList();

    const checkbox: HTMLInputElement = screen.getByLabelText("東京都", {
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

  it("大阪府のチェックボックスが表示されており、チェックされていない", () => {
    renderPrefectursCheckBoxList();

    const checkbox: HTMLInputElement = screen.getByLabelText("大阪府", {
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

    const checkbox: HTMLInputElement = screen.getByLabelText("北海道", {
      selector: "input",
    });

    await user.click(checkbox);
    expect(mockHandleChange).toHaveBeenCalled();
    expect(mockHandleChange).toBeCalledWith(1);
  });
});
