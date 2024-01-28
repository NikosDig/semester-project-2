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
