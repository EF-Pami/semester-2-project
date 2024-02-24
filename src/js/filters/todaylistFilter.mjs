// Get todays date and parse it to a string
const today = new Date().toISOString().split("T")[0];

/**
 * Sort passed in array if post was posted this day
 * @param {array} array
 * @returns a sorted array
 */


export function sortToday(array) {
  const sortedArray = array.filter((item) => {
    if (item.updated.startsWith(today)) {
      return true;
    } else {
      return false;
    }
  });
  return sortedArray;
}