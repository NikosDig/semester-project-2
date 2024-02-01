// Import the function you want to test
import { save } from "./saveJWT.mjs";

// Mock localStorage for testing purposes
let localStorageMock = {};

// Mock the setItem method using Object.defineProperty
Object.defineProperty(window, "localStorage", {
  value: {
    setItem: (key, value) => {
      localStorageMock[key] = value;
    },
    getItem: (key) => localStorageMock[key],
    removeItem: (key) => delete localStorageMock[key],
    clear: () => {
      localStorageMock = {};
    },
  },
  writable: true,
});

describe("save function", () => {
  test("should save a value to localStorage", () => {
    // Arrange
    const key = "testKey";
    const value = "testValue";

    // Act
    save(key, value);

    // Assert
    expect(localStorageMock[key]).toBeDefined();
    expect(JSON.parse(localStorageMock[key])).toEqual(value);
  });

  test("should overwrite an existing value in localStorage", () => {
    // Arrange
    const key = "testKey";
    const originalValue = "originalData";
    const updatedValue = "updatedData";

    // Set an initial value in localStorage
    localStorageMock[key] = JSON.stringify({ original: originalValue });

    // Act
    save(key, { updated: updatedValue });

    // Assert
    expect(localStorageMock[key]).toBeDefined();
    expect(JSON.parse(localStorageMock[key])).toEqual({
      updated: updatedValue,
    });
  });
});
