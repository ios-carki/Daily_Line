const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function getThisMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  return `${year}-${month.toString().padStart(2, "0")}`;
}

export function toNoteCardDate(dateString) {
  const [year, month, day] = getYearMonthDay(dateString)
  const date = getDate(year, month, day)

  return `${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")} ${WEEKDAYS[date.getDay()]}`
}

export function toEntryRowDay(dateString) {
  return Number(dateString.split("-")[2])
}

export function toEntryRowWeek(dateString) {
  const [year, month, day] = getYearMonthDay(dateString)
  const date = getDate(year, month, day)

  return WEEKDAYS[date.getDay()]
}

export function toEntryRowYearMonth(dateString) {
  const [year, month, ] = getYearMonthDay(dateString)

  return `${year}년 ${month}월`
}

function getYearMonthDay(stringDate) {
  return stringDate.split("-").map(Number)
}

function getDate(year, month, day) {
  return new Date(year, month - 1, day)
}