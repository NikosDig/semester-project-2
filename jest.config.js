// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.m?js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "mjs"],
};
