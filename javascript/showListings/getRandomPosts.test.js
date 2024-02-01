import { getRandomPosts } from "./getRandomPosts.mjs";

describe("getRandomPosts", () => {
  test("returns the specified number of random posts", () => {
    // Mock data for all posts
    const allPosts = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
      { id: 3, title: "Post 3" },
      { id: 4, title: "Post 4" },
      { id: 5, title: "Post 5" },
    ];

    // Specify the number of random posts to select
    const count = 3;

    // Call the getRandomPosts function
    const randomPosts = getRandomPosts(allPosts, count);

    // Assertions
    expect(randomPosts).toHaveLength(count);
    randomPosts.forEach((post) => {
      expect(allPosts).toContainEqual(post);
    });
  });

  test("returns all posts when count is greater than or equal to the total number of posts", () => {
    // Mock data for all posts
    const allPosts = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
      { id: 3, title: "Post 3" },
    ];

    // Set count greater than the total number of posts
    const count = 5;

    // Call the getRandomPosts function
    const randomPosts = getRandomPosts(allPosts, count);

    // Assertions
    expect(randomPosts).toHaveLength(allPosts.length);
    expect(randomPosts).toEqual(allPosts);
  });

  test("returns an empty array when count is zero", () => {
    // Mock data for all posts
    const allPosts = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
      { id: 3, title: "Post 3" },
    ];

    // Set count to zero
    const count = 0;

    // Call the getRandomPosts function
    const randomPosts = getRandomPosts(allPosts, count);

    // Assertion
    expect(randomPosts).toHaveLength(0);
  });
});
