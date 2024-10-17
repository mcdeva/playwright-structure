// format date `ddmmyy`
export function getCurrentDate2Digit(nextDay: number = 0): string {
  const currentDate = new Date();
  const date = new Date(currentDate.setDate(currentDate.getDate() + nextDay));
  const formatDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '');
  return formatDate;
}