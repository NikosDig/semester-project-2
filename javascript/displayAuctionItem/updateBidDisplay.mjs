/**
 * Updates the display of bids for a given auction item in the specified container.
 *
 * @param {HTMLElement} bidsContainer - The container element where the bids will be displayed.
 * @param {object} item - The auction item object containing bid information.
 * @param {Array} item.bids - An array of bids placed on the auction item.
 * @param {number} item.bids.amount - The amount of credits in the bid.
 * @param {string} item.bids.bidderName - The name of the bidder.
 */
export function updateBidDisplay(bidsContainer, item) {
  bidsContainer.innerHTML = ""; // Clear existing bids

  if (item.bids && item.bids.length > 0) {
    item.bids.forEach((bid, index) => {
      const bidElement = document.createElement("div");
      bidElement.classList.add("bid");

      const bidInfo = document.createElement("span");

      const creditText = bid.amount === 1 ? "Credit" : "Credits";

      bidInfo.innerText = `Bid ${index + 1}:  ${
        bid.amount
      } ${creditText} from ${bid.bidderName}`;

      bidElement.appendChild(bidInfo);
      bidsContainer.appendChild(bidElement);
    });
  } else {
    bidsContainer.innerHTML = "No bids placed yet.";
  }
}
