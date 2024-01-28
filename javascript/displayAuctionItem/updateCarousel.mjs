export function updateCarousel(carousel, item) {
  carousel.innerHTML = ""; // Clear existing carousel items

  if (item.media && item.media.length > 0) {
    item.media.forEach((image, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");

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

    new bootstrap.Carousel(carousel);
  } else {
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
