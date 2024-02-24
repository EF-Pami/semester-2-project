import * as storage from "../../storage/index.mjs";

/**
 * function clears out the localstorage when user logs out
 */

export function logout() {
    storage.remove("user");
    storage.remove("jwt");

    location.href = "../../index.html";
}