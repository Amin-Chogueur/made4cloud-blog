export default function formattedDate(createdAt) {
  const valideDate = new Date(createdAt);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(valideDate);

  return formattedDate;
}
