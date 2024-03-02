import { API_BASE_URL, ALL_PROFILES } from "../constants.mjs";

export async function EditAvatar() {
    document.addEventListener("DOMContentLoaded", function () {
        document
            .getElementById("editForm")
            .addEventListener("submit", function (evt) {
                evt.preventDefault();

                const userData = {
                    avatar: {
                        url: document.getElementById("UpdateAvatar").value,
                        alt: "user avatar",
                    },
                };

                const name = localStorage.getItem("userName");
                const accessToken = localStorage.getItem("accessToken");

                fetch(API_BASE_URL + ALL_PROFILES + "/" + name, {
                    method: "PUT",
                    body: JSON.stringify(userData),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                 .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return response
                            .json()
                            .then((data) =>
                                Promise.reject({ data, status: response.status}),
                            );
                    }
                 })
                 .then((data) => {
                    const storedProfile = localStorage.getItem("profile");
                    const profileData = storedProfile
                        ? JSON.parse(storedProfile)
                        : null;

                    if (profileData) {
                        profileData.data.avatar.url = userData.avatar.url;
                        localStorage.setItem("profile", JSON.stringify(profileData));
                    }

                    alert("Avatar updated successfully");
                    window.location.href = "../profile/index.html";
                 })
                 .catch((error) => {
                    if (error.status === 400 && error.data && error.data.errors) {
                        const errorMessage = error.data.errors
                            .map((error) => error.message)
                            .join("\n");
                        alert(`Error updating Avatar :\n${errorMessage}`);
                    } else {
                        console.error("Error updating Avatar:", error);
                        alert(`Error updating Avatar: ${error}.`);
                    }
                 });
            });
    });
}