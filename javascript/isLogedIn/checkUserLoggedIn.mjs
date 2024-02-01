/**
 * Checks if the user is currently logged in by verifying the presence of a valid authentication token
 * and a valid user object in the local storage.
 *
 * @returns {boolean} - True if the user is logged in, false otherwise.
 */
export function checkUserLoggedIn() {
  // Check if a valid authentication token is present
  const authToken = localStorage.getItem("token");
  if (!authToken) {
    return false;
  }

  // Check if a valid user object is present
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.name || !user.email) {
    return false;
  }

  return true;
}
