import { showOnePost } from "./../showListings/showSinglePost.mjs";
import { calculateTimeLeft } from "../calcTime/calculateTimeLeft.mjs";

/**
 * Fetches details for a specific auction item.
 *
 * @param {number} itemId - The unique identifier of the auction item.
 * @returns {Promise<object>} - A Promise that resolves to the details of the auction item.
 * @throws {Error} - Throws an error if there is an issue fetching the item details.
 */
export async function fetchAuctionItemDetails(itemId) {
  try {
    return await showOnePost(itemId);
  } catch (error) {
    console.error("Error fetching auction item details:", error);
    throw error;
  }
}

/**
 * Updates the title and meta information of the auction item on the webpage.
 *
 * @param {object} item - The auction item object containing title, description, and endsAt properties.
 * @param {string} item.title - The title of the auction item.
 * @param {string} item.description - The description of the auction item.
 * @param {string} item.endsAt - The timestamp indicating when the auction item ends.
 */
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
