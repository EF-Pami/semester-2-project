
import { API_BASE_URL, API_REGISTER_URL } from "../../constants.mjs";

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    
    registrationForm.addEventListener("submit", function (evt) {
        evt.preventDefault();

        const Auth_Registration = API_BASE_URL + API_REGISTER_URL;

        const Username = document.getElementById("name");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const avatarUrlInput = document.getElementById("avatar");
        

        const noroffEmailRegex = /[\w\-.]+@stud.noroff.no$/;
        if (!noroffEmailRegex.test(email.value)) {
            alert("Registration failed, please enter valid noroff email.");
            return;
        }
        //const avatarUrl = avatar.url;
        let registrationData = {
            name: Username.value,
            email: email.value,
            password: password.value,
            avatar: {
                url: avatarUrlInput.value
            }
            
        };
        
        console.log(avatar);

        //if (avatarUrl.value.trim() !=="") {
            //registrationData.avatar = avatarUrl.value;
        //}
        console.log(registrationData);
        fetch (Auth_Registration, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData),
        })

        .then((response) => {
            if (!response.ok) {
                throw new Error("Registration failed");
            }
            return response.json();
        })

        .then(() =>{
            Username.value = "";
            email.value = "";
            password.value = "";
            avatar.url.value = "";
            alert("Registration successful!");
        })
        .catch((error) => {
            alert("Registration failed. Please try again")
        });
    });
});



