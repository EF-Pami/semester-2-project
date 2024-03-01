/*import { API_BASE_URL } from "../constants.mjs";
import { ALL_LISTINGS } from "../constants.mjs";

export async function newlisting (Listtitle, Listcontent, accessToken) {
    try {
        const listData = {
            title: Listtitle,
            body: Listcontent,
        };

        if (!accessToken) {
            return;
        }

        const response = await fetch (`${API_BASE_URL}${ALL_LISTINGS}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify (listData),
        });

        if (response.ok) {
            const newPost = await response.json();
            window.location.href = '/listings.hmtl';
            return newPost
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}*/

export async function createListing() {
    const TitleInput = document.getElementById("listingTitle");
    const descriptionInput = document.getElementById("listingDescription");
    const tagInput = document.getElementById("listingTags");
    const mediaInput = document.getElementById("listingMediaUrls");
    const enddateInput = document.getElementById("listingEndsAt");

    const title = TitleInput.Value;
    const description = descriptionInput.Value;
    const tags = tagInput.Value.split(",").map((tag) => tag.trim());
    const mediaurl = mediaInput.Value.split('\n').map(url => ({ url: url.trim(), alt: "Auction item image"}));
    const enddate = enddateInput.value;

    const listingData = {
        title: title,
        description: description,
        tags: tags,
        media: mediaurl,
        enddate: enddate,
    };

    const accessToken = localStorage.getItem("accessToken");
    const BASE_URL = "https://v2.noroff.dev";
    const LISTING_URL = "/auction/listings";

    fetch(BASE_URL + LISTING_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
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
 
 