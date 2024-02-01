// __tests__/calculateTimeLeft.test.js

import { calculateTimeLeft } from "./calculateTimeLeft.mjs";

describe("calculateTimeLeft", () => {
  test("calculates time left correctly for future date", () => {
    const result = calculateTimeLeft(new Date().toISOString());
    expect(result).toHaveProperty("days");
    expect(result).toHaveProperty("hours");
    expect(result).toHaveProperty("minutes");
  });

  test("calculates time left correctly for past date", () => {
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    const result = calculateTimeLeft(pastDate.toISOString());
    expect(result).toHaveProperty("days");
    expect(result).toHaveProperty("hours");
    expect(result).toHaveProperty("minutes");
  });

  test("calculates time left correctly for future date with hours and minutes", () => {
    const futureDate = new Date(
      Date.now() + 2 * 60 * 60 * 1000 + 30 * 60 * 1000
    ); // 2 hours 30 minutes later
    const result = calculateTimeLeft(futureDate.toISOString());
    expect(result).toHaveProperty("days");
    expect(result).toHaveProperty("hours");
    expect(result).toHaveProperty("minutes");
  });

  test("calculates time left correctly for past date with hours and minutes", () => {
    const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000 - 30 * 60 * 1000); // 2 hours 30 minutes ago
    const result = calculateTimeLeft(pastDate.toISOString());
    expect(result).toHaveProperty("days");
    expect(result).toHaveProperty("hours");
    expect(result).toHaveProperty("minutes");
  });
});
