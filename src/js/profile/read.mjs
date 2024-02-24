import { API_BASE_URL, ALL_PROFILES, errorContainer, profileparams } from "../constants.mjs";
import { errorMessage } from "../components/error.mjs";
import { options } from "../components/bearer.mjs";

/**
 * function fetch profile from the API
 * @param {string} name username to fetch
 * @param {string} type type of fetch to do
 * @returns object
 */

export async function getProfile(name, type) {
    try {
        const response = await fetch(`${API_BASE_URL}${ALL_PROFILES}/${name}${type}${profileparams}`, options);
        const data = await response.json();

        return data;
    } catch (error) {
        errorContainer.innerHTML = errorMessage("Something went wrong.." + error);
    }
}