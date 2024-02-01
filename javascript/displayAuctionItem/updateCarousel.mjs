/**
 * Updates the content of a carousel with media items for a given auction item.
 *
 * @param {HTMLElement} carousel - The carousel element to be updated.
 * @param {object} item - The auction item object containing media information.
 * @param {Array} item.media - An array of media items (images) associated with the auction item.
 */
export function updateCarousel(carousel, item) {
  carousel.innerHTML = ""; // Clear existing carousel items

  if (item.media && item.media.length > 0) {
    item.media.forEach((image, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");

      // Set the first item as active
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

    // Initialize the Bootstrap Carousel
    new bootstrap.Carousel(carousel);
  } else {
    // If no media items are available, display a default image
    const defaultItem = document.createElement("div");
    defaultItem.classList.add("carousel-item", "active");

    const defaultImg = document.createElement("img");
    defaultImg.src = "../../assets/images/heading_img-1.png";
    defaultImg.classList.add("d-block", "w-100");
    defaultImg.alt = "Default Image";

    defaultItem.appendChild(defaultImg);
    carousel.appendChild(defaultItem);
  }
}
