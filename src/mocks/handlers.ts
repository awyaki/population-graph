import { http, HttpResponse } from "msw";
import { prefectures } from "./data/prefectures.js";

export const handlers = [
  http.get(`/api/prefectures`, () => {
    console.log("Captured a GET /api/prefectures request");

    return HttpResponse.json(prefectures);
  }),
];
