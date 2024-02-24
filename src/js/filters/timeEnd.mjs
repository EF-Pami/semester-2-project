/**
 * function in array by listing ending time, alphabetically in ascending order
 * @param {Array} array
 * @returns a sorted array
 */

export function sortEndsAtAsc(array) {
    const sortedArray = array.sort(function (a, b) {
        const timeA = a.endsAt;
        const timeB = b.endsAt;
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
 * function in array by listing ending time, alphabetically in descending order
 * @param {array} array
 * @returns a sorted array
 */

export function sortEndsAtDesc(array) {
    const sortedArray = array.sort(function (a, b) {
        const timeA = a.endsAt;
        const timeB = b.endsAt;
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