import { queryStringToCriteria } from "./queryStringToCriteria.ts";
import { describe, expect, test } from "bun:test";

describe("queryStringToCriteria", () => {
  test("should return a split query", () => {
    expect(queryStringToCriteria(".a.b.xyz")).toEqual(["a", "b", "xyz"]);
  });

  test("should return a empty query", () => {
    expect(queryStringToCriteria(".")).toEqual([""]);
  });
});
