const feedContainer = document.querySelector(".feedContainer");
import { showPosts } from "../showListings/showPosts.mjs";
import { renderPosts } from "../renderHTML.mjs/renderPosts.mjs";
import { logOUt } from "../storageJWT/logOut.mjs";
import { searchByTitle } from "../searchFunction/searchByTitle.mjs";

let offset = 100; // Initialize offset
let allPosts = [];

feedContainer.innerHTML = `
  <div class="loading-container justify-content-center">
    <div class="loading"></div>
    <div id="loading-text">loading</div>
  </div>`;

async function showAllThePostsOnThePage() {
  const loadingSpinner = document.querySelector(".loading-container");
  loadingSpinner.style.display = "flex";
  const postData = await showPosts();
  loadingSpinner.style.display = "none";
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

// search
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== "") {
    try {
      // Fetch posts matching the search term
      const searchResults = await showPosts();
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

// Initial load of posts
showAllThePostsOnThePage();

logOUt();
