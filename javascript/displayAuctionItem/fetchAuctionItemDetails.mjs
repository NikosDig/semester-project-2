import { showOnePost } from "./../showListings/showSinglePost.mjs";
import { calculateTimeLeft } from "../calcTime/calculateTimeLeft.mjs";

export async function fetchAuctionItemDetails(itemId) {
  try {
    return await showOnePost(itemId);
  } catch (error) {
    console.error("Error fetching auction item details:", error);
    throw error;
  }
}

export function updateTitleAndMeta(item) {
  const titleElement = document.querySelector(".auctionItemName");
  const descriptionElement = document.querySelector(".auctionItemDescription");
  const endsAtElement = document.querySelector(".auctionItemTimeRemaining");
  if (titleElement) titleElement.innerText = item.title;
  if (descriptionElement) descriptionElement.innerText = item.description;
  if (endsAtElement) {
    const timeLeft = calculateTimeLeft(item.endsAt);
    endsAtElement.innerText = `${timeLeft.days}D ${timeLeft.hours}H ${timeLeft.minutes}M`;
  }
  document.title = item.title + " || Find";
}
