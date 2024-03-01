import { logout, manageLoginButton } from "../api/auth/logout.mjs";
import { fetchListings } from "./listings.mjs";
import { createListing } from "./createlist.mjs";
import { userProfileAvatar } from "../utils/userAvatar.mjs";
import { SearchListings } from "./search.mjs";

SearchListings();
fetchListings();
userProfileAvatar();
logout();

document.addEventListener("DOMContentLoaded", function () {
    manageLoginButton();
});

document
    .getElementById("createListingBtn")
    .addEventListener("click", function () {
        createListing();
    });