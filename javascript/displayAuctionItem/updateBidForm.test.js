// Import necessary functions
import { updateBidForm } from "./updateBidForm.mjs";

// Mocking modules
jest.mock("../isLogedIn/checkUserLoggedIn.mjs", () => ({
  checkUserLoggedIn: jest.fn(),
}));

jest.mock("../makeBid/createBid.mjs", () => ({
  createBid: jest.fn(),
}));

describe("updateBidForm", () => {
  let bidForm;
  let itemId;
  let callback;

  beforeEach(() => {
    // Set up a basic HTML structure for testing
    document.body.innerHTML =
      '<form id="bidForm"><input id="bid" type="number"></form>';
    bidForm = document.getElementById("bidForm");
    itemId = 123; // Replace with a valid item ID
    callback = jest.fn();
  });

  afterEach(() => {
    // Clean up after each test
    document.body.innerHTML = "";
    jest.resetAllMocks();
  });

  test("handles form submission", () => {
    // Mock user being logged in
    require("../isLogedIn/checkUserLoggedIn.mjs").checkUserLoggedIn.mockReturnValueOnce(
      true
    );

    // Call the function
    updateBidForm(bidForm, itemId, callback);

    // Mock the input value and submit the form
    document.getElementById("bid").value = "50";
    bidForm.dispatchEvent(new Event("submit"));

    // Check if createBid is called with the correct arguments
    expect(require("../makeBid/createBid.mjs").createBid).toHaveBeenCalledWith(
      itemId,
      50,
      expect.any(Function)
    );
  });
});
