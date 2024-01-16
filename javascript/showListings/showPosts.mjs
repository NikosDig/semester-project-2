/**
 * Retrieves the last 100 posts that have been created from the Noroff Auction API.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array containing information about the last 100 posts.
 *
 * @example
 * // Example usage:
 * try {
 *   const posts = await showPosts();
 *   console.log(posts);
 * } catch (error) {
 *   console.error("Error retrieving posts:", error);
 *   alert("There was an error. Please try again later.");
 * }
 */
export async function showPosts() {
  /**
   * The base URL of the Noroff Auction API.
   * @type {string}
   */
  const API_URL = "https://api.noroff.dev/api/v1/auction";

  /**
   * The complete URL for fetching the last 100 posts from the API.
   * @type {string}
   */
  const url = API_URL + "/listings/";

  try {
    /**
     * Fetch data from the API.
     * @type {Response}
     */
    const response = await fetch(url);

    /**
     * Parse the response data as JSON.
     * @type {Object}
     */
    const data = await response.json();

    /**
     * Log the retrieved data and return it.
     * @type {Object[]}
     */
    //console.log(data);
    return data;
  } catch (error) {
    /**
     * Log an error message and display an alert in case of an error.
     */
    console.error("There was an error:", error);
    alert("There was an error. Please try again later.");
  }
}
