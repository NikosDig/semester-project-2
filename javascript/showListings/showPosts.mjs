/**
 * Retrieves posts from the Noroff Auction API with optional pagination and sorting.
 *
 * @param {number} limit - The number of results to return.
 * @param {number} offset - The number of results to skip.
 * @param {string} sort - The field to sort by.
 * @param {string} sortOrder - The sort order (asc or desc).
 * @returns {Promise<Object[]>} - A promise that resolves to an array containing information about the requested posts.
 */
export async function showPosts(
  limit = 100,
  offset = 0,
  sort = "endsAt",
  sortOrder = "asc"
) {
  const API_URL = "https://api.noroff.dev/api/v1/auction";
  const url = `${API_URL}/listings/?limit=${limit}&offset=${offset}&sort=${sort}&sortOrder=${sortOrder}&_active=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error:", error);
    alert("There was an error. Please try again later.");
  }
}
