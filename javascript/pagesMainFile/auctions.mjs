import { showPosts } from "../showListings/showPosts.mjs";
import { calculateTimeLeft } from "./../calcTime/calculateTimeLeft.mjs";
const feedContainer = document.querySelector(".feedContainer");

feedContainer.innerHTML = ` <div class="loading-container justify-content-center">
                            <div class="loading"></div>
                            <div id="loading-text">loading</div>
                            </div>`;

/**
 *
 * @param {object} postData An object containing information about the post, including created (creation date), endsAt (end date), media (array of media URLs), id (post ID), and title (post title).
 * @returns void: The function doesn't return a value, but it updates the HTML content of the .feedContainer.
 */
function renderPosts(postData) {
  let endDate = new Date(postData.endsAt).toLocaleDateString();
  let timeLeft = calculateTimeLeft(postData.endsAt);

  const bidsCount = postData._count.bids;
  const bidText = bidsCount > 0 ? bidsCount : "No bids yet";

  const feedContainer = document.querySelector(".feedContainer");

  if (postData.media.length > 0) {
    return (feedContainer.innerHTML += `
          <div class="col">
              <div class="card fixedSizeCard">
                  <a href="auctionItem.html?id=${postData.id}">
                  <img
                  src="${postData.media[0]}"
                  alt="${postData.id} ${postData.title}"
                  title="${postData.title}"
                  loading="lazy"
                  class="card-img-top fixedImgSize"
                /></a>
                <div class="card-body">
                  <h5 class="card-title bg-dark text-white p-1">
                       Ends at: (${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m)
                   </h5>
                  <h5 class="card-title">${postData.title}</h5>
                  <p class="card-text">Number of bids: ${bidText}</p>
                </div>
                      <div class="card-footer">
                       <a
                         href="auctionItem.html?id=${postData.id}"
                         title="bid now"
                         class="btn btn-custom rounded-4 text-uppercase w-50"
                         >Bid now
                       </a>
                      </div>
              </div>
          </div>`);
  } else {
    // Your existing code for when there is no media
    return (feedContainer.innerHTML += `
        <div class="col">
              <div class="card fixedSizeCard">
                  <a href="auctionItem.html?id=${postData.id}">
                  <img
                  src="../../assets/images/heading_img-1.png"
                  class="card-img-top fixedImgSize"
                  title="no image provided"
                  alt="No image provided"
                /></a>
                <div class="card-body">
                <h5 class="card-title bg-dark text-white p-1">
                Ends at: (${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m)
            </h5>
                  <h5 class="card-title">${postData.title}</h5>
                  <p class="card-text">Number of bids: ${bidText}</p>
                </div>
                      <div class="card-footer">
                       <a
                         href="auctionItem.html?id=${postData.id}"
                         title="bid now"
                         class="btn btn-custom rounded-4 text-uppercase w-50"
                         >Bid now
                       </a>
                      </div>
              </div>
          </div>`);
  }
}

/**
 *
 * @returns
 *This function fetches post data from the API, renders the posts using the renderPosts function, and handles the display of a loading
 *spinner during the fetching process.
 * SIDE EFFECTS:
 *Modifies the HTML content of .feedContainer to display the fetched posts.
 *Displays a loading spinner while fetching data.
 */
async function showAllThePostsOnThePage() {
  const loadingSpinner = document.querySelector(".loading-container");
  loadingSpinner.style.display = "flex";
  const postData = await showPosts();
  loadingSpinner.style.display = "none";
  return await postData.map((x) => renderPosts(x));
}

showAllThePostsOnThePage();
