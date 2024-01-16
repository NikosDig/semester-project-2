const feedContainer = document.querySelector(".feedContainer");
import { showPosts } from "../showListings/showPosts.mjs";
import { renderPosts } from "../renderHTML.mjs/renderPosts.mjs";
import { logOUt } from "../storageJWT/logOut.mjs";

feedContainer.innerHTML = ` <div class="loading-container justify-content-center">
                            <div class="loading"></div>
                            <div id="loading-text">loading</div>
                            </div>`;

/**
 * Fetches post data from the API, renders the posts using the renderPosts function, and handles the display of a loading spinner during the fetching process.
 *
 * @returns {Promise<void>} A promise representing the asynchronous execution of the function.
 *
 * @throws {Error} Throws an error if there is an issue fetching or rendering posts.
 *
 * @sideeffects Modifies the HTML content of .feedContainer to display the fetched posts.
 * Displays a loading spinner while fetching data.
 */
async function showAllThePostsOnThePage() {
  const loadingSpinner = document.querySelector(".loading-container");
  loadingSpinner.style.display = "flex";
  const postData = await showPosts();
  loadingSpinner.style.display = "none";
  return postData.map((x) => renderPosts(x, feedContainer));
}

showAllThePostsOnThePage();
logOUt();
