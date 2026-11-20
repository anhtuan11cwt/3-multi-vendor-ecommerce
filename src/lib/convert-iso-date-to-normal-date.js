export function convertIsoDateToNormalDate(isoDate) {
  if (!isoDate) return "";

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
