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
