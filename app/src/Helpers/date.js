/**
 * A map from month number to full month name
 */
export const MONTH_MAP = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

/**
 * Convert ISO date string to the format WeekDay: dd-mm-yy
 * @param {string} isoDate ISO datetime string as provided by Eloquent
 *
 * @References
 * 1. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
 * 2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
 */
export function toTableDateFormat(isoDateString) {
  const date = new Date(isoDateString);
  const yy = date.getFullYear();
  const m = date.getMonth() + 1; // The +1 is because it is zero-based
  let mm = m.toString();
  const d = date.getDate();
  let dd = d.toString();
  const dayOfTheWeek = date.getDay();

  const dayOfTheWeekMap = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tues',
    3: 'Wed',
    4: 'Thur',
    5: 'Fri',
    6: 'Sat',
  };

  if (d < 10) {
    dd = '0' + d;
  }

  if (m < 10) {
    mm = '0' + m;
  }

  return `${dayOfTheWeekMap[dayOfTheWeek]}: ${dd}-${mm}-${yy}`;
}

/**
 * Convert ISO date string to the format WeekDay: dd-mm-yy
 * @param {string} isoDateString ISO datetime string as provided by Eloquent
 *
 * @References
 * 1. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
 * 2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
 */
export function timeSince(isoDateString) {
  var seconds = Math.floor((new Date() - new Date(isoDateString)) / 1000); // The 1000 converts it from milliseconds to seconds

  var interval = Math.floor(seconds / 31530000);

  if (interval > 1) {
    return interval + (interval === 1 ? 'yr' : ' yrs');
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + 'm';
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + 'd';
  }
  interval = Math.floor(seconds / 3000);
  if (interval > 1) {
    return interval + 'h';
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + (interval === 1 ? 'min' : 'mins');
  }
  return Math.floor(seconds) + (interval === 1 ? 'sec' : 'secs');
}

/**
 * Check if a date falls within a range of months
 * @param {string} isoDate ISO datetime string as provided by Eloquent
 * @param {number} start The start month number (1 - 12)
 * @param {number} end The end month number (1 - 12)
 *
 * @example
 * const result = notifications.filter(notification =>
 *     inMonthRange(notification.created_at, startMonth, endMonth),
 * );
 *
 */
export function inMonthRange(isoDateString, start, end) {
  const date = new Date(isoDateString);
  const month = date.getMonth() + 1; // Because getMonth is zero-based
  return start <= month && month <= end;
}
