import { getUserIds, handleAddTopic, renderAgendaList } from "./common.mjs";
// import { getData, addData } from "./storage.mjs";

window.onload = function () {
  const users = getUserIds();

  // DOM elements
  const userSelect = document.getElementById("user-select");
  const addTopicForm = document.getElementById("add-topic-form");
  const topicInput = document.getElementById("topic");
  const dateInput = document.getElementById("date");

  let selectedUser = "";

  dateInput.value = new Date().toISOString().split("T")[0];

  // Populate user dropdown
  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  });

  // User selection
  userSelect.addEventListener("change", (e) => {
    selectedUser = e.target.value;
    renderAgendaList(selectedUser);
  });

  // Initial render (no user selected yet)
  renderAgendaList(selectedUser);

  // Add topic form
  addTopicForm.addEventListener("submit", (e) =>
    handleAddTopic(e, selectedUser, { topicInput, dateInput })
  );

  // clearData("5");
};
