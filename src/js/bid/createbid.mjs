import { API_BASE_URL, ALL_LISTINGS, userInfo } from "../constants.mjs";
import { successMessage } from "../components/success.mjs";
import { errorMessage } from "../components/error.mjs";
import { timeout } from "../components/timeout.mjs";
import * as storage from "../storage/index.mjs";


export async function createBid(evt) {
    evt.preventDefault();

    const errorContainer = document.querySelector(".invalid-feedback content-font");

    const [id, amount] = evt.target.element;
    const amountFig = Number(amount.value);

    //constructing data to be sent to API
    let dataobject = {
        amount: amountFig,
    };

    //getting auth token
    const jwt = storage.load("jwt");

    //sending data to API
    try {
        const response = await fetch(`${API_BASE_URL}${ALL_LISTINGS}/${id.value}/bids`, {
            method: "POST",
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
            errorContainer.innerHTML = successMessage("Bid");

            //update credits
            const newAmount = Number(userInfo.credits) - amountFig;
            storage.update("user", "credits", newAmount);

            await timeout(1200);
            location.reload();
        }
    } catch (error) {
        errorContainer.innerHTML = errorMessage("Something went wrong.." + error);
    }
}