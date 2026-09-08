export function generateCouponCode(title, expiryDate) {
  const formattedTitle = title.toUpperCase().replace(/\s/g, "");
  const formattedDate = expiryDate.split("-").reverse().join("");
  return `${formattedTitle}-${formattedDate}`;
}
