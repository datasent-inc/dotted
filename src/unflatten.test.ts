import { unflatten } from "./unflatten.ts";
import { describe, expect, test } from "bun:test";

describe("toObject", () => {
  test("should convert a hash of dot paths and values to an object", () => {
    const input = {
      ".key": "value",
      ".array[0]": "1",
      ".array[1]": 2,
    };

    expect(unflatten(input)).toEqual({
      key: "value",
      array: ["1", 2],
    });
  });
});
