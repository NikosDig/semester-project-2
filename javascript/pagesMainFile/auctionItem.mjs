import { showOnePost } from "./../showListings/showSinglePost.mjs";
import { calculateTimeLeft } from "../calcTime/calculateTimeLeft.mjs";
import { logOUt } from "./../storageJWT/logOut.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

// Function to display auction item details
async function displayAuctionItem() {
  try {
    // Fetch auction item details
    const item = await showOnePost(id);

    document.title = item.title + " || Find";

    // Extract relevant information
    const bidsCount = item._count.bids;
    const bidText = bidsCount > 0 ? bidsCount : "No bids yet";

    // Select DOM elements
    const name = document.querySelector(".auctionItemName");
    const timeRemaining = document.querySelector(".auctionItemTimeRemaining");
    const description = document.querySelector(".auctionItemDescription");
    const bids = document.querySelector(".auctionItemBids");

    // Update DOM elements with fetched data
    if (name) name.innerText = item.title;
    if (timeRemaining) {
      const timeLeft = calculateTimeLeft(item.endsAt);
      timeRemaining.innerText = `${timeLeft.days}D ${timeLeft.hours}H ${timeLeft.minutes}M`;
    }
    if (description) description.innerText = item.description;
    if (bids) bids.innerText = bidText;

    // Get the carousel element
    const carousel = document.querySelector("#carouselExampleIndicators");

    // Clear existing carousel items
    carousel.innerHTML = "";

    // Check if there are images in the API response
    if (item.media && item.media.length > 0) {
      // Add carousel items based on the images from the API
      item.media.forEach((image, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");

        // Add the 'active' class to the first item
        if (index === 0) {
          carouselItem.classList.add("active");
        }

        const imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.classList.add("d-block", "w-100");
        imgElement.alt = `Slide ${index + 1}`;

        carouselItem.appendChild(imgElement);
        carousel.appendChild(carouselItem);
      });

      // Initialize the carousel
      new bootstrap.Carousel(carousel);
    } else {
      // If no images, add a default carousel item
      const defaultItem = document.createElement("div");
      defaultItem.classList.add("carousel-item", "active");

      const defaultImg = document.createElement("img");
      defaultImg.src = "../../assets/images/heading_img-1.png";
      defaultImg.classList.add("d-block", "w-100");
      defaultImg.alt = "Default Image";

      defaultItem.appendChild(defaultImg);
      carousel.appendChild(defaultItem);
    }
  } catch (error) {
    console.error("Error fetching and displaying auction item:", error);
  }
}

// Call the async function to display the auction item
displayAuctionItem();
logOUt();
