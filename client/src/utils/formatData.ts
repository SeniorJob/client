export function formatDate(dateString: string) {
  const dateObj = new Date(dateString);

  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${year}.${month}.${day} ${hours}시 ${minutes}분`;

  return formattedDate;
}
