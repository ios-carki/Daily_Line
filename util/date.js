export function getThisMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  return `${year}-${month.toString().padStart(2, "0")}`;
}