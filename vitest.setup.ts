import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./api/mocks/server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
