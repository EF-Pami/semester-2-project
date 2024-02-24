import * as storage from "../../storage/index.mjs";

/**
 * function checks if user is logged in or not and redirects the user to the login page
 */

export function isUserLoggedIn() {
    const checkAuth = storage.load("jwt");

    if (checkAuth && checkAuth.length > 0) {
        return true;
    } else {
        return false;
    }
}