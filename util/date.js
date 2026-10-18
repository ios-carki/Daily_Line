// 날짜는 "YYYY-MM-DD" 문자열로 주고받고, 계산할 때만 Date로 바꾼다.

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

// 7 → "07"
export function pad2(number) {
  return String(number).padStart(2, "0");
}

// "2026-10-10" → Date (로컬 자정)
function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Date → "2026-10-10"
function formatDate(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

// 오늘 → "2026-10-10"
export function getToday() {
  return formatDate(new Date());
}

// 이번 달 → "2026-10"
export function getThisMonth() {
  return getToday().slice(0, 7);
}

// ("2026-10-31", 1) → "2026-11-01", 빼기는 음수로
export function addDays(dateString, days) {
  const date = parseDate(dateString);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

// "2026-10-10" → { year: 2026, month: 10, day: 10, weekday: "토", weekdayLong: "토요일" }
// 화면에 어떻게 보일지는 쓰는 쪽에서 조립한다.
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
