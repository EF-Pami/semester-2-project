import { API_BASE_URL, ALL_PROFILES, userInfo } from "../constants.mjs";
import { successMessage } from "../components/success.mjs";
import { errorMessage } from "../components/error.mjs";
import { timeout } from "../components/timeout.mjs";
import * as storage from "../storage/index.mjs";

/**
 * function update the users profile
 * @param {Element} evt form to get image from
 */

export async function updateProfile(evt) {
    evt.preventDefault();

    //error container
    const errorContainer = evt.target.queryselector(".invalid-feedback content-font");

    //getting form elements
    const [img] = evt.target.element;

    //constructing data to sent to the API
    let dataobject = {
        avatar: `${img.value}`,
    };
    try {
        const response = await fetch(`${API_BASE_URL}${ALL_PROFILES}/${userInfo.name}/media`, {
            method: "PUT",
            body: JSON.stringify(dataobject),
            headers: {
                Authorization: `Bearer ${jwt}`,
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
            errorContainer.innerHTML = successMessage("Profile avatar updated");
            await timeout(1200);
            location.reload();
        }
    } catch (error) {
        console.log(error);
        errorContainer.innerHTML = errorMessage("Something went wrong.." + error);
    }
}