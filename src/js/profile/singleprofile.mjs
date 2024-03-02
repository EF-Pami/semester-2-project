import { API_BASE_URL, ALL_PROFILES } from "../constants.mjs";

export async function UserInformaion() {
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
            const profileUsername = document.getElementById("UserName");
            if (profileUsername) {
                profileUsername.textContent = data.data.name;
            }
            console.log("avatar url", data.data.avatar.url);
            const profileAvatar = document.getElementById("userAvatar");
            if (profileAvatar) {
                profileAvatar.src = data.data.avatar.url;
                userAvatar.alt = `${data.data.name}'s Avatar`;
            }

            const userBio = document.getElementById("bio");
            if (userBio) {
                userBio.innerText = data.data.bio;
            }
            if (data.data.bio === nul || data.data.bio === "") {
                userBio.innerText = `Good dearler in auction sales`;
            }
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