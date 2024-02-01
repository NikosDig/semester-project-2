import { updateBidDisplay } from "./updateBidDisplay.mjs";

describe("updateBidDisplay", () => {
  let bidsContainer;
  let item;

  beforeEach(() => {
    // Set up a basic HTML structure for testing
    document.body.innerHTML = '<div id="bidsContainer"></div>';
    bidsContainer = document.getElementById("bidsContainer");

    // Sample auction item object with bids
    item = {
      bids: [
        { amount: 10, bidderName: "Bidder1" },
        { amount: 15, bidderName: "Bidder2" },
      ],
    };
  });

  afterEach(() => {
    // Clean up after each test
    document.body.innerHTML = "";
  });

  test("updates bid display with bids", () => {
    // Call the function to update bid display
    updateBidDisplay(bidsContainer, item);

    // Expectations
    expect(bidsContainer.innerHTML).not.toBe("No bids placed yet.");
    expect(bidsContainer.children.length).toBe(item.bids.length);

    const bidElements = bidsContainer.querySelectorAll(".bid span");
    expect(bidElements[0].innerText).toBe("Bid 1: 10 Credits from Bidder1");
  });

  test("updates bid display with no bids", () => {
    // Modify the item to have no bids
    item.bids = [];

    // Call the function to update bid display
    updateBidDisplay(bidsContainer, item);

    // Expectations
    expect(bidsContainer.innerHTML).toBe("No bids placed yet.");
    expect(bidsContainer.children.length).toBe(0);
  });
});
