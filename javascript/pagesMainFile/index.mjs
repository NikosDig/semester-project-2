import { showPosts } from "../showListings/showPosts.mjs";
import { getRandomPosts } from "../showListings/getRandomPosts.mjs";
import { renderPosts } from "../renderHTML.mjs/renderPosts.mjs";
import { logOUt } from "../storageJWT/logOut.mjs";
const feedContainer = document.querySelector(".fourPostsContainer");

/**
 * Asynchronously fetches the last 100 posts from the Noroff Auction API and selects a specified number of random posts.
 *
 * @param {number} count - The number of random posts to select.
 * @returns {Promise<Object[]>} - A promise that resolves to an array containing randomly selected posts.
 *
 * @throws {Error} - Throws an error if there is an issue fetching or selecting random posts.
 *
 * @example
 * // Example usage:
 * try {
 *   const randomPosts = await fetchAndSelectRandomPosts(4);
 *   console.log(randomPosts);
 *   // Now, you can use randomPosts to display the random posts on your webpage.
 * } catch (error) {
 *   console.error("Error retrieving and selecting random posts:", error);
 *   alert("There was an error. Please try again later.");
 * }
 */
async function fetchAndSelectRandomPosts(count) {
  try {
    const posts = await showPosts();
    return getRandomPosts(posts, count);
  } catch (error) {
    console.error("Error retrieving and selecting random posts:", error);
    throw new Error("Error fetching and selecting random posts.");
  }
}

// Usage:
try {
  const randomPosts = await fetchAndSelectRandomPosts(4);
  // Now, you can use randomPosts to display the random posts on your webpage.
  showAllThePostsOnThePage();
} catch (error) {
  console.error("Error retrieving and selecting random posts:", error);
  alert("There was an error. Please try again later.");
}

/**
 * Fetches post data from the API, renders the posts using the renderPosts function, and handles the display of a loading spinner during the fetching process.
 *
 * @returns {Promise<void>} A promise representing the asynchronous execution of the function.
 *
 * @throws {Error} Throws an error if there is an issue fetching or displaying posts.
 *
 * @sideeffects Modifies the HTML content of .feedContainer to display the fetched posts.
 * Displays a loading spinner while fetching data.
 */
async function showAllThePostsOnThePage() {
  const loadingSpinner = document.querySelector(".loading-container");

  try {
    const randomPosts = await fetchAndSelectRandomPosts(4);

    // Render each of the 4 random posts
    randomPosts.forEach((post) => renderPosts(post, feedContainer));
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
    alert("There was an error. Please try again later.");
  }
}

logOUt();
