
import { API_BASE_URL, API_REGISTER_URL } from "../../constants.mjs";

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    
    registrationForm.addEventListener("submit", function (evt) {
        evt.preventDefault();

        const avatarUrlInput = document.getElementById("avatar");
        const avatarUrl = avatarUrlInput.value.trim();

        const userData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };

        if (avatarUrl !== "") {
            userData.avatar ={
                url: avatarUrl,
            };
        }

        console.log("user Data:", userData);

        fetch(API_BASE_URL + API_REGISTER_URL, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status ===201) {
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
                alert("Registraion successful");
                console.log("user profile:", data);
            })
            .catch(error =>{
                let errorMessage = "Unexpected error, please try again.";

                if (error.body && error.body.errors && error.body.errors.length > 0) {
                    errorMessage = error.body.errors[0].message;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                const loginErrorDiv = document.getElementById("registration-error");
                if (loginErrorDiv) {
                    loginErrorDiv.textContent = errorMessage;
                }
            });

        
        
        
        
    });
});



