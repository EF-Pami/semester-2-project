import { API_BASE_URL, API_KEY_MODEL } from "../constants.mjs";

export const API_KEY = "99acbf65-1408-4ea6-918f-c7affce07078"

export async function fetchKey() {
    try {
        const api_key = "api_key";

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        };

        const response = await fetch(API_BASE_URL + API_KEY_MODEL, options);

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem(api_key, data.data.key);
        } else {
            console.error("Error:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}