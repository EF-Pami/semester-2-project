/*import { API_BASE_URL, API_LOGIN_URL } from "../../constants.mjs";
import { successMessage } from "../../components/success.mjs";
import { errorMessage } from "../../components/error.mjs";
import { timeout } from "../../components/timeout.mjs";
import * as storage from "../../storage/index.mjs";

/**
 * function setting out what to do when submitting info in loginform
 * @param {element} evt
 * 
 */

/*export async function login(evt) {
    evt.preventDefault();

    //error container
    const errorContainer = evt.target.queryselector(".invalid-feedback content-font");

    //assiging input elements
    const [Username, email, password] = evt.target.elements;

    const dataobj = JSON.stringify({
        name: Username.value,
        email: email.value,
        password: password.value,
    });

    //send data to the API
    try {
        const response = await fetch (`${API_BASE_URL}${API_LOGIN_URL}`, {
            method: "POST",
            body: dataobj,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });

        const json = await response.json();

        if (json.errors) {
            let message;
            if (json.errors[0].message) {
                message = json.errors[0].message;
            } else {
                message = json.errors[0].code;
            }
            errorContainer.innerHTML = errorMessage(`Error ${json.statusCode}, ${json.status}: ${message}`);
        } else {
            errorContainer.innerHTML = "";
            errorContainer.innerHTML = successMessage("Login successful");

            //saving user info
            storage.save("user", {
                name: json.name,
                email: json.email,
                avatar: json.avatar,
                credits: json.credits,
            });

            //save authentication token
            storage.save("jwt", json.accessToken);

            //redirect
            await timeout(1200);
            location.href = "../../profile/index.html";
        }
    } catch (error) {
        console.log(error);
        errorContainer.innerHTML = errorMessage("Something went wrong.." + error);
    }
}*/

import { API_BASE_URL, API_LOGIN_URL } from "../../constants.mjs";
import { updateLoginbtn } from "./isUserLoggedIn.mjs";

updateLoginbtn();

if (localStorage.length > 0) {
    localStorage.clear();
    console.log('localstorage cleared successfully');
} else {
    console.log('localstorage already cleared');
}

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