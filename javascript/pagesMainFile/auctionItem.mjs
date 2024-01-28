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

async function displayAuctionItem(callback) {
  try {
    const item = await fetchAuctionItemDetails(id);
    console.log(item);

    updateTitleAndMeta(item);

    const bidsContainer = document.querySelector(".auctionItemBidsContainer");
    updateBidDisplay(bidsContainer, item);

    const carousel = document.querySelector("#carouselExampleIndicators");
    updateCarousel(carousel, item);

    const bidForm = document.querySelector(".makeBid");
    updateBidForm(bidForm, id, callback);
  } catch (error) {
    console.error("Error fetching and displaying auction item:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayAuctionItem(() => {});
  logOUt();
});
