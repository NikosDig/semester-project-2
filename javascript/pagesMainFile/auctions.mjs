const feedContainer = document.querySelector(".feedContainer");
import { showPosts } from "../showListings/showPosts.mjs";
import { renderPosts } from "../renderHTML.mjs/renderPosts.mjs";
import { logOUt } from "../storageJWT/logOut.mjs";
import { searchByTitle } from "../searchFunction/searchByTitle.mjs";

// Initialize offset for fetching additional posts
let offset = 100;
// Array to store all posts
let allPosts = [];

// Set loading message while posts are being fetched
feedContainer.innerHTML = `
  <div class="loading-container justify-content-center">
    <div class="loading"></div>
    <div id="loading-text">loading</div>
  </div>`;

/**
 * Function to fetch and display all posts on the page.
 *
 * @returns {Array} - Array of post data.
 */
async function showAllThePostsOnThePage() {
  const loadingSpinner = document.querySelector(".loading-container");
  loadingSpinner.style.display = "flex";
  // Fetch all posts
  const postData = await showPosts();
  // Hide loading spinner
  loadingSpinner.style.display = "none";
  // Render and append all posts
  return postData.map((x) => renderPosts(x, feedContainer));
}

const showMore = document.querySelector(".showMore");

showMore.addEventListener("click", async () => {
  try {
    // Fetch additional posts with the current offset
    const additionalPosts = await showPosts(100, offset, "created", "asc");
    // console.log(additionalPosts);

    // Concatenate the additional posts with the existing ones
    allPosts = allPosts.concat(additionalPosts);
    console.log(allPosts); // Test search with all posts

    // Render and append the additional posts
    await Promise.all(
      additionalPosts.map((post) => renderPosts(post, feedContainer))
    );

    // Increment offset for the next set of posts
    offset += 100;
  } catch (error) {
    console.error("Error fetching or rendering additional posts:", error);
    alert("There was an error. Please try again later.");
  }
});

// Event listener for the search form
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Get search input
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== "") {
    try {
      // Fetch posts matching the search term
      const searchResults = await showPosts();
      // Filter posts based on the search term
      const filteredResults = searchByTitle(searchTerm, searchResults);

      // Clear the feed container before rendering search results
      feedContainer.innerHTML = "";

      // Render and append search results
      await Promise.all(
        filteredResults.map((result) => renderPosts(result, feedContainer))
      );
    } catch (error) {
      console.error("Error fetching or rendering search results:", error);
      alert("There was an error. Please try again later.");
    }
  }
});

// Initial load of posts when the page loads
showAllThePostsOnThePage();

// Log out the user
logOUt();
