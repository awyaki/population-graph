import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./api/mocks/server";

beforeAll(() => {
  server.listen();
  console.log("before tests");
});

afterEach(() => {
  server.resetHandlers();
  console.log("after tests");
});

afterAll(() => {
  server.close();
  console.log("affter all tests");
});
