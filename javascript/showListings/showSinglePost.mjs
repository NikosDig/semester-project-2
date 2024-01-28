/**
 * Retrieves information about a specific post based on the provided post ID from the Noroff Auction API.
 *
 * @param {number} id - The ID of the particular post to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to an object containing information about the selected post.
 * If the post is not found, it returns an error message.
 *
 * @example
 * // Example usage:
 * try {
 *   const postId = 123; // Replace with the actual post ID
 *   const post = await showOnePost(postId);
 *   console.log(post);
 * } catch (error) {
 *   console.error("Error retrieving post:", error);
 *   alert("There was an error. Please try again later.");
 * }
 */
export async function showOnePost(id) {
  /**
   * The base URL of the Noroff Auction API.
   * @type {string}
   */
  const API_URL = "https://api.noroff.dev/api/v1/auction";

  /**
   * The complete URL for fetching information about a specific post from the API.
   * @type {string}
   */
  const url = `${API_URL}/listings/${id}?_bids=true`;

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
     * Check if the response is OK and log the retrieved data.
     * @type {Object}
     */
    if (response.ok) {
      //console.log(data);
      return data;
    } else {
      /**
       * If the response is not OK, return an error message.
       */
      console.error("Post not found");
      return Promise.reject("Post not found");
    }
  } catch (error) {
    /**
     * Log an error message and display an alert in case of an error.
     */
    console.error("There was an error:", error);
    alert("There was an error. Please try again later.");
  }
}

//showOnePost("27414c36-7071-435f-b117-89c12ad9fae6");
