import { checkUserLoggedIn } from "../isLogedIn/checkUserLoggedIn.mjs";
import { createBid } from "../makeBid/createBid.mjs";

/**
 * Updates the visibility of the bid form based on user login status and handles form submission.
 *
 * @param {HTMLElement} bidForm - The form element for placing bids.
 * @param {number} itemId - The unique identifier of the auction item.
 * @param {function} callback - The callback function to be executed after submitting the bid form.
 */
export function updateBidForm(bidForm, itemId, callback) {
  /**
   * Checks if the user is logged in.
   *
   * @returns {boolean} - True if the user is logged in, false otherwise.
   */
  const isLoggedIn = checkUserLoggedIn();

  if (isLoggedIn) {
    bidForm.classList.remove("d-none");
  } else {
    bidForm.classList.add("d-none");
  }

  /**
   * Handles the submission of the bid form.
   *
   * @param {Event} event - The form submission event.
   */
  bidForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve bid amount from the form input
    const bidAmount = parseFloat(document.getElementById("bid").value);
    // Call the createBid function to submit the bid
    createBid(itemId, bidAmount, callback);
  });
}
