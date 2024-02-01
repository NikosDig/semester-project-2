/**
 * Searches for items in an array based on the title containing the specified query.
 *
 * @param {string} query - The search query.
 * @param {Array} items - An array of items to search through.
 * @returns {Array} - An array of search results that match the title containing the search query.
 */
export function searchByTitle(query, items) {
  const searchTerm = query.trim().toLowerCase();

  // Filter items based on the title containing the search term
  const searchResults = items.filter((item) =>
    item.title.trim().toLowerCase().includes(searchTerm)
  );

  return searchResults;
}
