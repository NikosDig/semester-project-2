/**
 * Updates user profile elements on the Edit Profile page in the DOM based on the information provided in the user object.
 *
 * @param {Object} user - An object containing user profile information.
 *
 * @example
 * // Example usage:
 * const user = {
 *   name: "John Doe",
 *   email: "john@example.com",
 *   credits: 500
 * };
 * fixProfileForEditProfilePage(user);
 */
export function fixProfileForEditProfilePage(user) {
  /**
   * Select DOM Elements:
   * - profileName: Selects the HTML element with the class ".profileName".
   * - profileEmail: Selects the HTML element with the class ".profileEmail".
   * - profileCredits: Selects the HTML element with the class ".profileCredits".
   */
  const profileName = document.querySelector(".profileName");
  const profileEmail = document.querySelector(".profileEmail");
  const profileCredits = document.querySelector(".profileCredits");

  /**
   * Update Profile Information:
   * - Sets the inner text of profileName to the user's name.
   * - Sets the inner text of profileEmail to the user's email.
   * - Sets the inner text of profileCredits to the user's credits.
   */
  profileName.innerText = user.name;
  profileEmail.innerText = user.email;
  profileCredits.innerText = user.credits.toString();
}
