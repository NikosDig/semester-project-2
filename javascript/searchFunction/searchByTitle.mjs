export function searchByTitle(query, items) {
  const searchTerm = query.toLowerCase();

  // Filter items based on the title containing the search term
  const searchResults = items.filter((item) =>
    item.title.trim().toLowerCase().includes(searchTerm)
  );

  return searchResults;
}
