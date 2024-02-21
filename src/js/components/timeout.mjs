/**
 * setting time down promise in ms
 * @param {number} ms is the number of milisecond to set a timer 
 */

function timedown(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

/**
 * creating new time to reload the page
 * @param {number} time the time in milisecond to set a timer for reloading
 */

export async function timeout(time) {
    await timedown(time);
}