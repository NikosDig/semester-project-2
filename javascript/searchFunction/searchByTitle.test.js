// searchByTitle.test.js
import { searchByTitle } from "./searchByTitle";

describe("searchByTitle", () => {
  const items = [
    { title: "Lorem Ipsum" },
    { title: "Sample Title" },
    { title: "Another Example" },
    { title: "Not Matching" },
  ];

  test("returns items with titles containing the search query", () => {
    const query = "sample";

    const results = searchByTitle(query, items);

    expect(results).toHaveLength(1);
    expect(results).toEqual([{ title: "Sample Title" }]);
  });

  test("returns empty array when no matching items found", () => {
    const query = "nonexistent";

    const results = searchByTitle(query, items);

    expect(results).toHaveLength(0);
    expect(results).toEqual([]);
  });

  test("is case-insensitive", () => {
    const query = "lorem";

    const results = searchByTitle(query, items);

    expect(results).toHaveLength(1);
    expect(results).toEqual([{ title: "Lorem Ipsum" }]);
  });

  test("trims titles before matching", () => {
    const query = " not matching ";

    const results = searchByTitle(query, items);

    expect(results).toHaveLength(1);
    expect(results).toEqual([{ title: "Not Matching" }]);
  });
});
