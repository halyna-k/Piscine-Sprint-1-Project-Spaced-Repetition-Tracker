export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

/**
 * Calculates spaced repetition revision dates from a given start date.
 *
 * @param {string | Date} startDate - Starting date (YYYY-MM-DD or Date object)
 * @returns {string[]} Array of revision dates in YYYY-MM-DD format
 */
export function calculateRevisionDates(startDate) {
  const baseDate = new Date(startDate);
  if (isNaN(baseDate)) throw new Error('Invalid date provided');

  const intervals = [
    { days: 7 },
    { months: 1 },
    { months: 3 },
    { months: 6 },
    { years: 1 },
  ];

  const addInterval = (date, { days = 0, months = 0, years = 0 }) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    d.setMonth(d.getMonth() + months);
    d.setFullYear(d.getFullYear() + years);
    return d;
  };

  const formatDate = (date) => date.toISOString().split('T')[0];

  return intervals.map(interval => formatDate(addInterval(baseDate, interval)));
}
