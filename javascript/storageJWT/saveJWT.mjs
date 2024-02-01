/**
 * Saves a value to localStorage using the specified key.
 *
 * @param {string} key - The key under which the value will be stored in localStorage.
 * @param {any} value - The value to be stored.
 */
export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
