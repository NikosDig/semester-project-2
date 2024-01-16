/**
 * Updates user profile elements in the DOM based on the information provided in the user object.
 *
 * @param {Object} user - An object containing user profile information.
 *
 * @example
 * // Example usage:
 * const user = {
 *   name: "John Doe",
 *   email: "john@example.com",
 *   credits: 500,
 *   avatar: "path/to/avatar.jpg"
 * };
 * fixProfile(user);
 */
export function fixProfile(user) {
  /**
   * Select DOM Elements:
   * - profileName: Selects the HTML element with the class ".profileName".
   * - profileEmail: Selects the HTML element with the class ".profileEmail".
   * - profilePicture: Selects the HTML element with the class ".profileImage".
   * - profileCredits: Selects the HTML element with the class ".profileCredits".
   */
  const profileName = document.querySelector(".profileName");
  const profileEmail = document.querySelector(".profileEmail");
  const profilePicture = document.querySelector(".profileImage");
  const profileCredits = document.querySelector(".profileCredits");
  /**
   * Update Profile Information:
   * - Sets the inner text of profileName to the user's name.
   * - Sets the inner text of profileEmail to the user's email.
   * - Sets the inner text of profileCredits to the user's credits.
   */
  profileName.innerText = user.name;
  profileEmail.innerText = user.email;
  profileCredits.innerText = user.credits;
  /**
   * Update Profile Picture:
   * - Checks if the user has an avatar (user.avatar is truthy).
   * - If an avatar exists, sets the "src" attribute of profilePicture to the user's avatar path.
   * - If no avatar exists, sets the "src" attribute of profilePicture to a default image path.
   */
  if (user.avatar) {
    profilePicture.setAttribute("src", user.avatar);
  } else {
    profilePicture.setAttribute(
      "src",
      "../../assets/images/rowan-atkinson.webp"
    );
  }
}
