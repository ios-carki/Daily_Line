export function getThisMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  return `${year}-${month.toString().padStart(2, "0")}`;
}
const now = new Date();
const temp = "2026-10-10";
const year = now.getFullYear();
const month = now.getMonth();
const today = now.getDate();
console.log(today);

const DUMMY_ENTRIES = [
  { id: 1, date: "2026-10-10", mood: 5 },
  { id: 2, date: "2026-10-09", mood: 2 },
  { id: 3, date: "2026-09-28", mood: 4 },
];

const recordedDays = DUMMY_ENTRIES
  .filter((entry) => {
    const [recordYear, recordMonth] = entry.date.split("-").map(Number);

    return recordYear === year && recordMonth === month + 1;
  })
  .map((entry) => Number(entry.date.split("-")[2]));

  console.log(recordedDays)