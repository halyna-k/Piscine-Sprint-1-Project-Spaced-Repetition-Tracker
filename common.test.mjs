import { getUserIds, calculateRevisionDates, handleAddTopic } from "./common.mjs";
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

test("Submit form: valid input", () => {
  let addedData = null;
  let renderedUserId = null;

  const mockAddData = (userId, topic) => { addedData = { userId, topic }; };
  const mockRenderAgendaList = (userId) => { renderedUserId = userId; };

  const topicInput = { value: "Practice Testing" };
  const dateInput = { value: "2025-11-01" };
  const selectedUser = "user1";

  const e = { preventDefault: () => { e.called = true; } };
  e.called = false;

  handleAddTopic( e, selectedUser, { topicInput, dateInput }, mockAddData, mockRenderAgendaList);

  assert.equal(e.called, true);
  assert.equal(addedData.userId, selectedUser);
  assert.equal(addedData.topic.topic, "Practice Testing");
  assert.equal(addedData.topic.date, "2025-11-01");
  assert.equal(topicInput.value, "");
  assert.equal(dateInput.value, "");
  assert.equal(renderedUserId, selectedUser);
});
