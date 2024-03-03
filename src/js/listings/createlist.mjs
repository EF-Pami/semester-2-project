import { API_KEY } from "../components/apikeymodel.mjs";

export async function createListing() {
    const TitleInput = document.getElementById("listingTitle");
    const descriptionInput = document.getElementById("listingDescription");
    const tagInput = document.getElementById("listingTags");
    const mediaInput = document.getElementById("listingMediaUrls");
    const enddateInput = document.getElementById("listingEndsAt");

    const title = TitleInput.value;
    const description = descriptionInput.value;
    const tags = tagInput.value.split(",").map((tag) => tag.trim());
    const mediaurl = mediaInput.value.split('\n').map(url => ({ url: url.trim(), alt: "Auction item image"}));
    const enddate = enddateInput.value;

    const listingData = {
        title: title,
        description: description,
        tags: tags,
        media: mediaurl,
        enddate: enddate,
    };

    const accessToken = localStorage.getItem("accessToken");
    const apiKey = API_KEY;
    const BASE_URL = "https://v2.api.noroff.dev";
    const LISTING_URL = "/auction/listings";

    fetch(BASE_URL + LISTING_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": apiKey,
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(listingData),

    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Unsuccessful!. status: ${response.status}`);
            }
        })
        .then((data) => {
            console.log("Successful", data);
            TitleInput.value = "";
            descriptionInput.value = "";
            tagInput.value = "";
            mediaInput.value = "";
            enddateInput.value = "";
            location.reload();
        })
        .catch(error => {
            let errorMessage = "Unexpected error. Please fill out all required field.";

            const listingErrorDiv = document.getElementById("createListingError");
            if (listingErrorDiv) {
                listingErrorDiv.innerHTML = errorMessage
            }
        });
}
 
 