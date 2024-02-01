import { checkUserLoggedIn } from "../isLogedIn/checkUserLoggedIn.mjs";
import { createBid } from "../makeBid/createBid.mjs";

export function updateBidForm(bidForm, itemId, callback) {
  const isLoggedIn = checkUserLoggedIn();

  if (isLoggedIn) {
    bidForm.classList.remove("d-none");
  } else {
    bidForm.classList.add("d-none");
  }

  bidForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const bidAmount = parseFloat(document.getElementById("bid").value);
    createBid(itemId, bidAmount, callback);
  });
}
