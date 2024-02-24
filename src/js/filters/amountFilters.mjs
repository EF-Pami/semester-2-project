/**
 * function filter amounts in array in ascending order
 * @param {Array} array
 * @returns a filtered array
 */

export function filterAmountAsc(array) {
    const sortedArray = array.sort(function (a, b) {
        const amountA = a.amount;
        const amountB = b.amount;
        if (amountA >= amountB) {
            return -1;
        }
        if (amountA <= amountB) {
            return 1;
        }
        return 0;
    });
    return sortedArray
}


/**
 * function filter amount in array in descending order
 */

export function filterAmountDesc(array) {
    const sortedArray = array.sort(function (a, b) {
        const amountA = a.amount.toLowerCase();
        const amountB = b.amount.toLowerCase();
        if (amountA <= amountB) {
            return -1;
        }
        if (amountA >= amountB) {
            return 1;
        }
        return 0;
    });
    return sortedArray;
}