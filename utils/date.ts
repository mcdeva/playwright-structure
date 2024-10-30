// format date `ddmmyy`
export function getCurrentDate(nextDay: number = 0): string {
  const currentDate = new Date();
  const date = new Date(currentDate.setDate(currentDate.getDate() + nextDay));
  const formatDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  return formatDate;
}

export function getCurrentDate2Digit(nextDay: number = 0): string {
  const currentDate = new Date();
  const date = new Date(currentDate.setDate(currentDate.getDate() + nextDay));
  const formatDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }).replace(/\//g, '');
  return formatDate;
}

export function getCurrentFullMonth(monthNumber: number): string {
  switch (monthNumber) {
    case 1: return "January";
    case 2: return "February";
    case 3: return "March";
    case 4: return "April";
    case 5: return "May";
    case 6: return "June";
    case 7: return "July";
    case 8: return "August";
    case 9: return "September";
    case 10: return "October";
    case 11: return "November";
    case 12: return "December";
    default: return "Invalid month";
  }
}

// split by date dd/mm/yyyy
export function splitDate(dateString: string): { day: string, month: string, year: string } {
  const [day, month, year] = dateString.split('/');
  return {
    day: day,
    month: month,
    year: year
  };
}