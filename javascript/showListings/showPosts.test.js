import { showPosts } from "./showPosts.mjs";
describe("showPosts", () => {
  beforeEach(() => {
    // Mock the global fetch function
    global.fetch = jest.fn();
    // Mock console.error to avoid seeing the error messages in the console
    console.error = jest.fn();
  });

  test("fetches posts with default parameters", async () => {
    // Mock data for a successful response
    const mockData = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];

    // Mock the fetch function to return a resolved Promise with the mock data
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    // Call the showPosts function with default parameters
    const posts = await showPosts();

    // Assertions
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.noroff.dev/api/v1/auction/listings/?limit=100&offset=0&sort=endsAt&sortOrder=asc&_active=true"
    );
    expect(posts).toEqual(mockData);
  });

  test("handles errors during API request", async () => {
    // Mock the fetch function to return a rejected Promise (simulate an error)
    global.fetch.mockRejectedValueOnce({ message: "Network error" });

    // Call the showPosts function
    try {
      await showPosts();
    } catch (error) {
      // Assertions
      expect(global.fetch).toHaveBeenCalled();
      expect(error.message).toBe(
        "There was an error fetching posts: Network error"
      );
    }
  });
});
