/**
 * Loads a JSON Web Token (JWT) from localStorage based on the specified key.
 *
 * @param {string} key - The key used to store the JWT in localStorage.
 * @returns {string | null} - The JWT if found, or null if not found or an error occurs during parsing.
 */
export const loadJWT = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};
