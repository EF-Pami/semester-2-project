/**
 * function filter listings for a particular month
 * @param {array} array
 * @returns a sorted array
 */

const current = new Date();
const first = current.getDate();
const last = first - current.getDay() - 30;

//converting to ISO strings
const firstDay = new Date(current.setDate(first)).toISOString();
const lastDay = new Date(current.setDate(last)).toISOString();

export function sortMonth(array) {
    const sortedArray = array.filter((item) => {
        if (item.updated < firstDay && item.updated > lastDay) {
            return true;
        } else {
            return false;
        }
    });
    return sortedArray;
}