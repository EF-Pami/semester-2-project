import { API_BASE_URL, ALL_LISTINGS, BID_ON_LISTING } from "../constants.mjs";

export function placeBid() {
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("bidForm");

        if (!form) {
            return;
        }

        form.addEventListener("submit", function (evt) {
            evt.preventDefault();
            const bidAmountInput = document.getElementById("bidAmount");
            const bidAmount = bidAmountInput.value;

            if (bidAmount) {
                submitBid(bidAmount);
            } else {
                console.log('Place bid amount');
            }
        });
    });

    function submitBid(amount) {
        const bidData = {
            amount: Number(amount),
        };

        const accessToken = localStorage.getItem("accessToken");
        const urlParams = new URLSearchParams(window.location.search);
        const listingID = urlParams.get("listingId");
        if (!listingID) {
            console.log("listing ID is required to place bid");
            return;
        }

        const url = `${API_BASE_URL}${ALL_LISTINGS}/${listingID}${BID_ON_LISTING}`;

        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(bidData),
        })

        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => Promise.reject(data));
            }
            return response.json();
        })
        .then ((data) => {
            alert("Bid successfully place", data);
            console.log("Bid successfully place", data);
            location.reload();
        })

        .catch((error) => {
            let errorMessage= "Unexpected error, please try again";
            if (error.errors && error.errors.length > 0) {
                errorMessage = error.errors[0].message;
                const bidError = document.getElementById("bidError");
                if (bidError) {
                    bidError.textContent = errorMessage;
                }
            } else {
                console.log("Error placing Bid:", error.message);
                alert(error.message);
            }
        });
    }
}