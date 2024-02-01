import { checkUserLoggedIn } from "./checkUserLoggedIn.mjs";

describe("checkUserLoggedIn", () => {
  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
  });

  test("returns false if authentication token is not present", () => {
    // Act
    const result = checkUserLoggedIn();

    // Assert
    expect(result).toBe(false);
  });

  test("returns false if user object is not present", () => {
    // Arrange
    localStorage.setItem("token", "validToken");

    // Act
    const result = checkUserLoggedIn();

    // Assert
    expect(result).toBe(false);
  });

  test("returns false if user object is missing name or email", () => {
    // Arrange
    localStorage.setItem("token", "validToken");
    localStorage.setItem("user", JSON.stringify({ name: "John Doe" }));

    // Act
    const result = checkUserLoggedIn();

    // Assert
    expect(result).toBe(false);
  });

  test("returns true if authentication token and valid user object are present", () => {
    // Arrange
    const validUser = {
      name: "John Doe",
      email: "john@example.com",
    };

    localStorage.setItem("token", "validToken");
    localStorage.setItem("user", JSON.stringify(validUser));

    // Act
    const result = checkUserLoggedIn();

    // Assert
    expect(result).toBe(true);
  });
});
