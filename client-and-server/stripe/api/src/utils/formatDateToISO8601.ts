export default function formatDateToISO8601(date: number | string | Date) {
  return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
}
