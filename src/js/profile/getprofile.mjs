import { API_BASE_URL, ALL_PROFILES } from "../constants.mjs";
import { API_KEY } from "../components/apikeymodel.mjs";

export async function fetchUserProfile() {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const apiKey = API_KEY;
        const userName = localStorage.getItem("userName");

        if (!userName) {
            return;
        }

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": apiKey,
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await fetch(
            `${API_BASE_URL}${ALL_PROFILES}/${userName}`,
            options,
        );

        if (response.ok) {
            const data = await response.json();
            const profileData = data.data;
        } else {
            console.error(
                "error getting user profile:",
                response.status,
                response.statusText,
            );
        }
    } catch (error) {
        console.error("fetch error:", error.message);
    }
}