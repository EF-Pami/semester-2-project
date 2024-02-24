/**
 * Sort passed in array by title, alphabetically in descending order
 * @param {array} array
 * @returns a sorted array
 * 
 */


export function sortTitleDesc(array) {
    const sortedArray = array.sort(function (a, b) {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA <= titleB) {
        return -1;
      }
      if (titleA >= titleB) {
        return 1;
      }
      return 0;
    });
    return sortedArray;
}


/**
 * Sort passed in array by title, alphabetically in ascending order
 * @param {array} array
 * @returns a sorted array
 * 
 */

export function sortTitleAsc(array) {
    const sortedArray = array.sort(function (a, b) {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA >= titleB) {
        return -1;
      }
      if (titleA <= titleB) {
        return 1;
      }
      return 0;
    });
    return sortedArray;
}