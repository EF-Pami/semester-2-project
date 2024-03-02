
import { API_BASE_URL, API_LOGIN_URL } from "../../constants.mjs";


document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (evt) {
        evt.preventDefault();

        const Auth_Login = API_BASE_URL +API_LOGIN_URL;

        const email = document.getElementById("emailLogIn");
        const password = document.getElementById("passwordLoggIn");

        const loginData = {
            email: email.value,
            password: password.value,
        };

        fetch(Auth_Login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error("Login failed");
            }
            return response.json();
        })

        .then((data) => {
            const accessToken = data.accessToken;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("username", data.name);
            localStorage.setItem("avatar", data.avatar);
            localStorage.setItem("banner", data.banner);
            localStorage.setItem("IsloggedIn", "true");
            localStorage.setItem("credits", data.credits);
            window.location.href = "/listings.html";
        })
        .catch((error) => {
            alert("Login failed. wrong email or password");
        });
    });
});