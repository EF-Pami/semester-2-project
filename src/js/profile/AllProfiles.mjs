import { API_BASE_URL, ALL_PROFILES } from "../constants.mjs";

export async function fetchAllProfiles() {
    try {
        const accessToken = localStorage.getItem("accessToken");
        let currentPage = 1;

        async function fetchPage(page) {
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await fetch(
                `${API_BASE_URL}${ALL_PROFILES}?page=${page}`,
                options,
            );

            if (response.ok) {
                const data = await response.json();
                console.log("profiles - Page", page, ":", data.data);

                if (!data.meta.isLastPage) {
                    await fetchPage(page + 1);
                }
            } else {
                console.error(
                    "Error getting profiles - page",
                    page,
                    ":",
                    response.status,
                    response.statusText,
                );
            }
        }
        await fetchPage(currentPage);
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

