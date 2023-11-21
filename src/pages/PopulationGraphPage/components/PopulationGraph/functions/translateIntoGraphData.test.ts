import { it, expect, describe } from "vitest";
import {
  translateIntoGraphData,
  type PopPaylad,
} from "./translateIntoGraphData";

export const tokyo: PopPaylad = {
  boundaryYear: 2020,
  data: [
    {
      label: "総人口",
      data: [
        { year: 1960, value: 9683802 },
        { year: 1965, value: 10869244 },
      ],
    },
    {
      label: "年少人口",
      data: [
        { year: 1960, value: 2249052, rate: 23.2 },
        { year: 1965, value: 2216945, rate: 20.3 },
      ],
    },
  ],
};

export const osaka: PopPaylad = {
  boundaryYear: 2020,
  data: [
    {
      label: "総人口",
      data: [
        { year: 1960, value: 4206313 },
        { year: 1965, value: 4798653 },
      ],
    },
    {
      label: "年少人口",
      data: [
        { year: 1960, value: 1146564, rate: 27.2 },
        { year: 1965, value: 1149974, rate: 23.9 },
      ],
    },
  ],
};

const populations = [tokyo, osaka];

const prefs = [
  {
    prefCode: 13,
    prefName: "東京都",
  },
  {
    prefCode: 27,
    prefName: "大阪府",
  },
];

describe("translateIntoGraphData", () => {
  it("東京都と大阪府のデータからグラフ用のデータを得る", () => {
    const result = translateIntoGraphData(
      [13, 27],
      prefs,
      populations,
      "総人口"
    );

    expect(result).toEqual({
      boundaryYear: 2020,
      data: [
        {
          label: "総人口",
          東京都: 9683802,
          大阪府: 4206313,
          year: 1960,
        },
        {
          label: "総人口",
          東京都: 10869244,
          大阪府: 4798653,
          year: 1965,
        },
      ],
    });
  });
});
