import { API_BASE_URL, ALL_PROFILES } from "../constants.mjs";
import { logout, manageLoginButton } from "../api/auth/logout.mjs";
import { userProfileAvatar } from "../utils/userAvatar.mjs";
import { UserCredits } from "../utils/usercredit.mjs";
import { UserInformaion } from "./singleprofile.mjs";
import { EditAvatar } from "./update.mjs";
import { fetchUserProfile } from "./getprofile.mjs";

fetchUserProfile();
EditAvatar();
UserInformaion();
UserCredits();
userProfileAvatar();
logout();

document.addEventListener("DOMContentLoaded", function () {
    manageLoginButton();
});