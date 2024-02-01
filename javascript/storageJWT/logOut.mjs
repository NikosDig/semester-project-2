import { remove } from "./removeJWT.mjs";

/**
 * Logs the user out by removing the JWT and user information from local storage.
 * Redirects the user to the login page.
 */
export function logOUt() {
  // Get the logout button element
  const loggerOut = document.querySelector(".loggerOut");

  // Attach a click event listener to the logout button
  loggerOut.onclick = function () {
    // Remove the JWT and user information from local storage
    remove("token");
    remove("user");
    // Redirect the user to the login page
    window.location.href = "/logIn.html";
  };
}
