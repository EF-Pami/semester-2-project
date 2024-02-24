/**
 * function handles error messsages
 * @param {string} message the error message to be displayed
 * @returns to display the error message in the DOM
 */

export function errorMessage(message = "Unknown error") {
    return `
    <div class ="invalid-feedback content-font">
    <span>${message} </span>
    </div>`;
}