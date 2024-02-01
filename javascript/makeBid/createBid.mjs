import { loadJWT } from "../storageJWT/loadJWT.mjs";

/**
 * Creates a bid for a specific auction item.
 *
 * @param {number} itemId - The unique identifier of the auction item for which the bid is being placed.
 * @param {number} bidAmount - The amount of the bid in credits.
 * @param {function} callback - Optional callback function to be executed after a successful bid creation.
 * @throws {Error} - Throws an error if there is an issue creating the bid.
 */
export async function createBid(itemId, bidAmount, callback) {
  try {
    //console.log("Creating bid...");
    // Base URL for the auction API
    const API_URL = "https://api.noroff.dev/api/v1/auction";
    // Load authentication token
    const loadKey = await loadJWT("token");

    // Fetch function to create a bid
    const response = await fetch(`${API_URL}/listings/${itemId}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loadKey}`,
      },
      body: JSON.stringify({ amount: bidAmount }),
    });

    if (response.ok) {
      //console.log("Bid created successfully");
      // Fetch and display updated auction details
      if (callback && typeof callback === "function") {
        callback();
      }
      alert("Bid placed successfully");
      // Reload the page after a successful bid
      window.location.reload();
    } else {
      // Handle unsuccessful bid creation
      const responseData = await response.json();
      console.error("Failed to create bid:", responseData);

      // Show an alert with the error message
      window.alert(`Failed to create bid: ${responseData.errors[0].message}`);
    }
  } catch (error) {
    console.error("Error creating bid:", error);
    throw error;
  }
}
