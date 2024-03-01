import { API_BASE_URL, ALL_PROFILES } from "../constants.mjs";

export async function UserCredits() {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const userName = localStorage.getItem("userName");

        if (!userName) {
            return;
        }

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await fetch(
            `${API_BASE_URL}${ALL_PROFILES}/${userName}`,
            options,
        );

        if (response.ok) {
            const data = await response.json();
            console.log("user profile:", data.data);
            const profileData = data.data;

            if (profileData && profileData.credit !== undefined) {
                const creditsElement = document.querySelector("#creditsProfilePage");
                if (creditsElement) {
                    creditsElement.innerHTML = `User's Credit: ${profileData.credits}$`;
                }
            }
        } else {
            console.error(
                "Unexpected error fetching User profile:",
                response.status,
                response.statusText,
            );
        }
    } catch (error) {
        console.error("fetch error:", error.message);
    }
}