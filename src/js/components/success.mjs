/**
 * code for success handling
 * @param {string} messsage the success message to display
 * @returns returns success message in the DOM
 */

export function successMessage (message = "Action") {
    return `<div class= "valid-feedback content-font">
    <span>${message} Registration successful! </span>
    </div>`;

}