import { fixProfile } from "./fixProfileValues.mjs";
describe("fixProfile", () => {
  // Mock the document object
  const mockDocument = document.implementation.createHTMLDocument();
  global.document = mockDocument;

  beforeEach(() => {
    // Create the necessary DOM elements
    const profileName = document.createElement("div");
    profileName.classList.add("profileName");
    document.body.appendChild(profileName);

    const profileEmail = document.createElement("div");
    profileEmail.classList.add("profileEmail");
    document.body.appendChild(profileEmail);

    const profileImage = document.createElement("img");
    profileImage.classList.add("profileImage");
    document.body.appendChild(profileImage);

    const profileCredits = document.createElement("div");
    profileCredits.classList.add("profileCredits");
    document.body.appendChild(profileCredits);
  });

  afterEach(() => {
    // Clear the DOM after each test
    document.body.innerHTML = "";
  });

  test("updates user profile elements in the DOM", () => {
    // Arrange
    const user = {
      name: "John Doe",
      email: "john@example.com",
      credits: 500,
    };

    // Act
    fixProfile(user);

    // Assert
    expect(document.querySelector(".profileName").innerText).toBe(user.name);
    expect(document.querySelector(".profileEmail").innerText).toBe(user.email);
    // Convert innerText to a number before comparison
    expect(+document.querySelector(".profileCredits").innerText).toEqual(
      user.credits
    );
  });

  test("handles case when user has no avatar", () => {
    // Arrange
    const user = {
      name: "Jane Doe",
      email: "jane@example.com",
      credits: 800,
      avatar: null,
    };

    // Act
    fixProfile(user);

    // Assert
    expect(document.querySelector(".profileImage").getAttribute("src")).toBe(
      "../../assets/images/rowan-atkinson.webp"
    );
  });
});
