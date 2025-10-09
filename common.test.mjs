import { getUserIds, calculateRevisionDates } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("User count is correct", () => {
 assert.equal(getUserIds().length, 5);
});

test("Correct revision dates are calculated", () => {
  const normalize = d => d.toISOString().split("T")[0];
  const startDate = "2025-10-31";

  const expectedDates = [
    new Date("2025-11-07"),
    new Date("2025-11-30"),
    new Date("2026-01-31"),
    new Date("2026-04-30"),
    new Date("2026-10-31"),
  ].map(normalize);

  const calculatedDates = calculateRevisionDates(startDate).map(normalize);

  assert.deepEqual(calculatedDates, expectedDates);
});
