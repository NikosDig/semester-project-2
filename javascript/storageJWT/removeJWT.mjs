/**
 * Removes an item from localStorage based on the specified key.
 *
 * @param {string} key - The key of the item to be removed.
 */
export const remove = (key) => localStorage.removeItem(key);
