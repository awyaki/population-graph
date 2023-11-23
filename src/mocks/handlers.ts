import { http, delay, HttpResponse } from "msw";
import { prefectures } from "./data/prefectures.js";
import { populationTokyo as tokyo } from "./data/population-13-tokyo.js";
import { populationAichi as aichi } from "./data/population-23-aichi.js";
import { populationOsaka as osaka } from "./data/population-27-osaka.js";

export const handlers = [
  http.get(`/api/prefectures`, () => {
    console.log("Captured a GET /api/prefectures request");

    return HttpResponse.json(prefectures);
  }),
  http.get("/api/population", async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const { searchParams } = url;

    const prefCode = searchParams.get("prefCode");

    if (prefCode === null) return new HttpResponse(null, { status: 404 });

    console.log(`Captured a GET /api/population?prefCode=${prefCode} request`);

    switch (prefCode) {
      case "13": {
        return HttpResponse.json(tokyo);
      }
      case "23": {
        return HttpResponse.json(aichi);
      }
      case "27": {
        return HttpResponse.json(osaka);
      }
      default:
        return new HttpResponse(null, { status: 404 });
    }
  }),
];
