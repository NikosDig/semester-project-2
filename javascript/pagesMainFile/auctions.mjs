const feedContainer = document.querySelector(".feedContainer");
import { showPosts } from "../showListings/showPosts.mjs";
import { renderPosts } from "../renderHTML.mjs/renderPosts.mjs";
import { logOUt } from "../storageJWT/logOut.mjs";

let offset = 100; // Initialize offset

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

    console.log(additionalPosts);

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

// Initial load of posts
showAllThePostsOnThePage();

logOUt();
