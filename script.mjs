import { getUserIds, calculateRevisionDates } from "./common.mjs";
import { getData, addData } from "./storage.mjs";

// DOM elements
const userSelect = document.getElementById("user-select");
const agendaList = document.getElementById("agenda-list");
const noSelectionMsg = document.getElementById("no-selection-msg");
const addTopicForm = document.getElementById("add-topic-form");
const topicInput = document.getElementById("topic");
const dateInput = document.getElementById("date");

// Utility helpers
function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}

// Convert Date to YYYY-MM-DD
function toYMD(date) {
  return (
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate())
  );
}

// Convert YYYY-MM-DD to Date
function fromYMD(ymd) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

// Clear and message helpers
function clearAgendaView() {
  agendaList.innerHTML = "";
}

function showNoAgenda() {
  agendaList.textContent = "This user has no agenda.";
}

// Set today’s date as default
(function setToday() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = pad(today.getMonth() + 1);
  const dd = pad(today.getDate());
  dateInput.value = `${yyyy}-${mm}-${dd}`;
})();

// Render user’s agenda
function renderAgenda(userId) {
  clearAgendaView();

  if (!userId) {
    agendaList.textContent = "Please select a user.";
    return;
  }

  const data = getData(userId) || [];

  if (data.length === 0) {
    showNoAgenda();
    return;
  }

  const todayUTC = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate()
    )
  );

  // Filter to show only upcoming items
  const future = data.filter((it) => fromYMD(it.date) >= todayUTC);

  if (future.length === 0) {
    agendaList.textContent = "No upcoming revisions (all dates in the past).";
    return;
  }

  future.sort((a, b) => fromYMD(a.date) - fromYMD(b.date));

  const list = document.createElement("ul");
  future.forEach((it) => {
    const li = document.createElement("li");
    li.textContent = `${it.topic} — ${fromYMD(it.date).toLocaleDateString()}`;
    list.appendChild(li);
  });

  agendaList.appendChild(list);
}

// User selection
userSelect.addEventListener("change", () => {
  const v = userSelect.value;
  if (!v) {
    noSelectionMsg.textContent = "No user selected.";
  } else {
    noSelectionMsg.textContent = `Showing agenda for ${v}:`;
  }
  renderAgenda(v);
});

// Add topic form
addTopicForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userId = userSelect.value;

  if (!userId) {
    alert("Please select a user first.");
    return;
  }

  const topic = topicInput.value.trim();
  const dateVal = dateInput.value;

  if (!topic) {
    alert("Please enter a topic name.");
    topicInput.focus();
    return;
  }

  if (!dateVal) {
    alert("Please select a date.");
    dateInput.focus();
    return;
  }

  const start = fromYMD(dateVal);
  const revDates = calculateRevisionDates(start);

  // Create revision entries
  const payload = revDates.map((d) => ({topic, date: d}));

  // Save data
  addData(userId, payload);

  // Refresh agenda
  renderAgenda(userId);

  // Reset form
  topicInput.value = "";
});
