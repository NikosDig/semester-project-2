import { createBid } from "./createBid.mjs";
import * as loadJWTModule from "../storageJWT/loadJWT.mjs";

// Mock the console.error function
console.error = jest.fn();

jest.mock("../storageJWT/loadJWT.mjs");

describe("createBid", () => {
  beforeEach(() => {
    // Clear mock function calls
    jest.clearAllMocks();
  });

  test("creates a bid successfully and executes callback", async () => {
    // Arrange
    const itemId = 123;
    const bidAmount = 50;
    const callback = jest.fn();

    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    // Mock the loadJWT function
    loadJWTModule.loadJWT.mockResolvedValue("mockedToken");

    // Act
    await createBid(itemId, bidAmount, callback);

    // Assert
    expect(loadJWTModule.loadJWT).toHaveBeenCalledWith("token");
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.noroff.dev/api/v1/auction/listings/${itemId}/bids`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mockedToken",
        },
        body: JSON.stringify({ amount: bidAmount }),
      }
    );
    expect(callback).toHaveBeenCalled();
  });
});
