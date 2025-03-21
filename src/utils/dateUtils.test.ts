import { calculateAge } from "./dateUtils";

describe("calculateAge", () => {
  test("should return correct age when birthday has already passed", () => {
    expect(calculateAge("1993-01-01")).toBe(32); // Assuming today is 2025-03-21
  });

  test("should return correct age when birthday has NOT yet passed", () => {
    expect(calculateAge("1993-12-25")).toBe(31); // Assuming today is 2025-03-21
  });

  test("should return 0 if no birthDate is provided", () => {
    expect(calculateAge("")).toBe(0);
  });
});
