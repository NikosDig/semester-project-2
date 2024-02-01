import { updateCarousel } from "./updateCarousel.mjs";

describe("updateCarousel", () => {
  test("updates carousel with media items", () => {
    // Arrange
    const carousel = document.createElement("div");
    const item = {
      media: ["image1.jpg", "image2.jpg"],
    };

    // Act
    updateCarousel(carousel, item);

    // Assert
    const carouselItems = carousel.querySelectorAll(".carousel-item");
    expect(carouselItems.length).toBe(2);

    const activeItem = carousel.querySelector(".carousel-item.active");
    expect(activeItem).toBeTruthy();

    const imgElements = carousel.querySelectorAll("img");
    expect(imgElements.length).toBe(2);
  });

  test("updates carousel with default image when no media items are available", () => {
    // Arrange
    const carousel = document.createElement("div");
    const item = {
      media: [],
    };

    // Act
    updateCarousel(carousel, item);

    // Assert
    const carouselItems = carousel.querySelectorAll(".carousel-item");
    expect(carouselItems.length).toBe(1);

    const activeItem = carousel.querySelector(".carousel-item.active");
    expect(activeItem).toBeTruthy();

    const imgElement = carousel.querySelector("img");
    expect(imgElement.src).toContain("heading_img-1.png");
  });
});
