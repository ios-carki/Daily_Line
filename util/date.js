export function getThisMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  return `${year}-${month.toString().padStart(2, "0")}`;
}

export function toNoteCardDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number)

  const date = new Date(year, month - 1, day)
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return `${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")} ${weekdays[date.getDay()]}`
}