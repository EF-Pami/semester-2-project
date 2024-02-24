/**
 * Sort passed in array by time, alphabetically, ascending order
 * @param {array} array
 * @returns a sorted array
 * @example
 */


export function sortTimeAsc(array) {
    const sortedArray = array.sort(function (a, b) {
      const timeA = a.updated;
      const timeB = b.updated;
      if (timeA >= timeB) {
        return -1;
      }
      if (timeA <= timeB) {
        return 1;
      }
      return 0;
    });
    return sortedArray;
}


/**
 * Sort passed in array by time, alphabetically, descending order
 * @param {array} array
 * @returns a sorted array
 * @example
 */

export function sortTimeDesc(array) {
    const sortedArray = array.sort(function (a, b) {
      const timeA = a.updated;
      const timeB = b.updated;
      if (timeA <= timeB) {
        return -1;
      }
      if (timeA >= timeB) {
        return 1;
      }
      return 0;
    });
    return sortedArray;
}