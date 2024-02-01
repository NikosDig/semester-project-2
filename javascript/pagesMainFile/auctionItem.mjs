import { fetchAuctionItemDetails } from "./../displayAuctionItem/fetchAuctionItemDetails.mjs";
import { updateTitleAndMeta } from "./../displayAuctionItem/fetchAuctionItemDetails.mjs";
import { updateBidDisplay } from "./../displayAuctionItem/updateBidDisplay.mjs";
import { updateCarousel } from "./../displayAuctionItem/updateCarousel.mjs";
import { updateBidForm } from "./../displayAuctionItem/updateBidForm.mjs";
import { logOUt } from "./../storageJWT/logOut.mjs";
import { createBid } from "../makeBid/createBid.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

/**
 * Fetches and displays details of an auction item, updating various elements on the webpage.
 *
 * @param {function} callback - Optional callback function to be executed after displaying the auction item.
 * @throws {Error} - Throws an error if there is an issue fetching or displaying the auction item.
 */
async function displayAuctionItem(callback) {
  try {
    // Fetch details of the auction item
    const item = await fetchAuctionItemDetails(id);
    //console.log(item);

    // Update title and meta information
    updateTitleAndMeta(item);

    // Update the display of bids
    const bidsContainer = document.querySelector(".auctionItemBidsContainer");
    updateBidDisplay(bidsContainer, item);

    // Update the carousel with media items
    const carousel = document.querySelector("#carouselExampleIndicators");
    updateCarousel(carousel, item);

    // Update the bid form and handle form submission
    const bidForm = document.querySelector(".makeBid");
    updateBidForm(bidForm, id, callback);
  } catch (error) {
    console.error("Error fetching and displaying auction item:", error);
    throw error;
  }
}

/**
 * Event listener for the 'DOMContentLoaded' event. Initiates the display of an auction item
 * and logs out the user.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Display details of the auction item
  displayAuctionItem(() => {});
  // Log out the user
  logOUt();
});
