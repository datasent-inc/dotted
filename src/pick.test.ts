import { pick } from "./pick.ts";
import { describe, expect, test } from "bun:test";

describe("pick", () => {
  test("should return the an object element", () => {
    expect(
        pick(
            {
              article: {
                title: "how to pick your friends",
              },
            },
            ".article",
        ),
    ).toEqual({
      title: "how to pick your friends",
    });
    expect(
        pick(
            {
              article: {
                title: "how to pick your friends",
              },
            },
            ".article.title",
        ),
    ).toEqual("how to pick your friends");
  });

  test("should return the an array element", () => {
    expect(
      pick(
        {
          articles: [
            {
              title: "how to pick your friends",
              body: "lorem ipsum",
            },
          ],
        },
        ".articles",
      ),
    ).toEqual([
      {
        title: "how to pick your friends",
        body: "lorem ipsum",
      },
    ]);

    expect(
      pick(
        {
          articles: [
            {
              title: "how to pick your friends",
              body: "lorem ipsum",
            },
            {
              title: "2",
              body: "lorem ipsum",
            },
          ],
        },
        ".articles[0]",
      ),
    ).toEqual({
      title: "how to pick your friends",
      body: "lorem ipsum",
    });
  });

  test("should return array of elements if a wildcard array is used", () => {
    expect(
      pick(
        {
          articles: [
            {
              title: "how to pick your friends",
              body: "lorem ipsum",
            },
            {
              title: "2",
              body: "lorem ipsum",
            },
          ],
        },
        ".articles[*].title",
      ),
    ).toEqual(["how to pick your friends", "2"]);
  });

  test("should return array of elements if a wildcard array is used", () => {
    expect(
      pick(
        {
          articles: [
            {
              title: "how to pick your friends",
              body: "lorem ipsum",
              authors: [
                {
                  name: "Steve",
                },
              ],
            },
            {
              title: "2",
              body: "lorem ipsum",
              authors: [
                {
                  name: "Luna",
                },
                {
                  name: "Salhe",
                },
              ],
            },
          ],
        },
        ".articles[*].authors[*].name",
      ),
    ).toEqual(["Steve", "Luna", "Salhe"]);
  });

  test("should return the root object", () => {
    expect(
      pick(
        {
          authors: [
            {
              name: "Luna",
            },
            {
              name: "Salhe",
            },
          ],
        },
        ".",
      ),
    ).toEqual({
      authors: [
        {
          name: "Luna",
        },
        {
          name: "Salhe",
        },
      ],
    });
    expect(
      pick(
        [
          {
            name: "Luna",
          },
          {
            name: "Salhe",
          },
        ],
        ".",
      ),
    ).toEqual([
      {
        name: "Luna",
      },
      {
        name: "Salhe",
      },
    ]);
  });

  test("should allow a query string", () => {
    expect(
      pick(
        {
          authors: [
            {
              name: "Luna",
            },
            {
              name: "Salhe",
            },
          ],
        },
        ".authors[0]",
      ),
    ).toEqual({
      name: "Luna",
    });
  });
});
