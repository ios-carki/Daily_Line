const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function pad2(number) {
  return String(number).padStart(2, "0");
}

function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function getToday() {
  return formatDate(new Date());
}

export function getThisMonth() {
  return getToday().slice(0, 7);
}

export function addDays(dateString, days) {
  const date = parseDate(dateString);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

export function getDateParts(dateString) {
  const date = parseDate(dateString);
  const weekday = WEEKDAYS[date.getDay()];

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday,
    weekdayLong: `${weekday}요일`,
  };
}
