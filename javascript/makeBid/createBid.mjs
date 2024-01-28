import { loadJWT } from "../storageJWT/loadJWT.mjs";

export async function createBid(itemId, bidAmount, callback) {
  try {
    console.log("Creating bid...");
    const API_URL = "https://api.noroff.dev/api/v1/auction";
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
      // Bid creation successful
      console.log("Bid created successfully");
      // Fetch and display updated auction details
      if (callback && typeof callback === "function") {
        callback();
      }
      alert("Bid placed successfully");
      // Reload the page after a successful bid
      window.location.reload();
    } else {
      const responseData = await response.json();
      console.error("Failed to create bid:", responseData);

      // Show an alert with the error message
      window.alert(`Failed to create bid: ${responseData.errors[0].message}`);
    }
  } catch (error) {
    console.error("Error creating bid:", error);
  }
}
