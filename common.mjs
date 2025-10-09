import { getData, addData } from "./storage.mjs";

export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

// Helper for formatting dates with ordinals
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Format date as “5th January 2023”
function formatDate(date) {
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const ordinal = n => ( n >= 11 && n <= 13 ) ? "th" : ( n % 10 === 1 ? "st" : n % 10 === 2 ? "nd" : n % 10 === 3 ?"“rd" : "th" );
  return `${day}${ordinal(day)} ${month} ${year}`;
}

/**
 * Calculates spaced repetition revision dates from a given start date.
 *
 * @param {string | Date} startDate - Starting date (YYYY-MM-DD or Date object)
 * @returns {string[]} Array of revision dates in YYYY-MM-DD format
 */
export function calculateRevisionDates(startDate) {
  const baseDate = new Date(startDate);

  // Define intervals for revisions
  const intervals = [
    { days: 7 },
    { months: 1 },
    { months: 3 },
    { months: 6 },
    { years: 1 },
  ];

  // Function to add intervals to a date
  const addInterval = (date, { days=0, months=0, years=0 }) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    d.setMonth(d.getMonth() + months);
    d.setFullYear(d.getFullYear() + years);
    return d;
  };

  return intervals.map(interval => addInterval(baseDate, interval));
}

/**
 * Render agenda list for a given user
 */
export function renderAgendaList(userId) {
  const list = document.getElementById("agenda-items");
  if (!list) return;

  // Clear current list
  list.innerHTML = "";

  // Fetch user’s agenda
  const agenda = getData(userId) || [];
  if (agenda.length === 0) {
    list.innerHTML = "<li>No data</li>";
    return;
  }

  const allRevisions = [];

  // Prepare all revision dates for each topic
  agenda.forEach(item => {
    const capitalized = item.topic.charAt(0).toUpperCase() + item.topic.slice(1);
    const revisionDates = calculateRevisionDates(item.date);
    revisionDates.forEach(dateObj => {
      allRevisions.push({ capitalized, date: new Date(dateObj) });
    });
  });

  // Sort all revisions by date (earliest first)
  allRevisions.sort((a, b) => a.date - b.date);

  // Render each revision as a list item
  allRevisions.forEach(({ capitalized, date }) => {
    const li = document.createElement("li");
    li.textContent = `${capitalized}, ${formatDate(date)}`;
    list.appendChild(li);
  });
}

/**
 * Handle adding a new topic for a user
 */
export function handleAddTopic(e, userId, { topicInput, dateInput }) {
  e.preventDefault();

  if (!userId) {
    alert("Please select a user first.");
    return;
  }

  const topic = topicInput.value.trim();
  const date = dateInput.value;

  if (!topic || !date) {
    alert("Please fill in both the topic and date.");
    return;
  }

  // Prepare new topic
  const newTopic = { id: Date.now(), topic, date };

  // Save to storage
  addData(userId,  newTopic);

  // Clear inputs
  topicInput.value = "";
  dateInput.value = "";

  // Re-render updated agenda
  renderAgendaList(userId);
}
