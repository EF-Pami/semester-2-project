import { API_BASE_URL, API_REGISTER_URL, loginForm} from "../../constants.mjs";
import { validateEmail} from "../../components/validateEmail.mjs";
import { validAvatar} from "../../components/validAvatar.mjs";
import { successMessage } from "../../components/success.mjs";
import { errorMessage } from "../../components/error.mjs";
import { timeout } from "../../components/timeout.mjs";

export async function register(evt) {
    evt.preventDefault();
    //getting error container
    const errorContainer = evt.target.querySelector(".invalid-feedback content-font");

    // assigning inputs to the form variables
    const [userName, email, password, avatar] = evt.target.element;
    
    let validatedEmail = "";

    if (!validateEmail(email.value)) {
        errorContainer.innerHTML = errorMessage("Please enter a valid email");
    } else {
        errorContainer.innerHTML = "";
        validatedEmail = email.value;

        //validate the user avatar
        const userAvatar = validAvatar(avatar.value);

        //data to be sent to the API
        const dataobj = JSON.stringify({
            name: userName.value,
            email: validatedEmail,
            password: password.value,
            avatar: userAvatar,
        });

        try {
            const response = await fetch(`${API_BASE_URL}${API_REGISTER_URL}`, {
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
                    message = json.errors[0].message
                }
                if (json.errors[0].code) {
                    message = json.errors[0].code;
                }
                errorContainer.innerHTML = errorMessage(`Error ${json.statusCode}, ${json.status}: ${message}`);
            } else {
                errorContainer.innerHTML = successMessage("Registration successful");
                await timeout(1200);
                window.location.href = '/profile/login.html';

                loginForm.querySelector("input[type=email]").value = validatedEmail;
                loginForm.querySelector("input[type=password]").value = password.value;
            }
        } catch (error) {
            console.log(error);
            errorContainer.innerHTML = errorMessage("Something went wrong.." + error);
        }
    }
}