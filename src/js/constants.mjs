import { isUserLoggedIn } from "./api/auth/isUserLoggedIn.mjs";
import * as storage from "../js/storage/index.mjs";

//API URLs
export const API_BASE_URL = "https://api.noroff.dev";
export const API_REGISTER_URL = "/api/v1/auction/auth/register";
export const API_LOGIN_URL = "api/v1/auction/auth/login";
export const ALL_LISTINGS = "/api/v1/auction/listings";
export const SINGLE_LISTING = "/api/v1/auction/listings/<id>";
export const BID_ON_LISTING = "/api/v1/auction/listings/<id>/bids";
export const ALL_PROFILES = "/api/v1/auction/profiles";
export const SINGLE_PROFILE = "/api/v1/auction/profiles/<name>";
export const ALL_LISTINGS_BY_PROFILES = "/api/v1/auction/profiles/<name>/listings";


//Forms
export const loginForm = document.querySelector("#loginForm");
export const registrationForm = document.querySelector("#registrationForm");

//isUserLoggedIn
export const loggedIn = isUserLoggedIn();

//userInfo
export const userInfo = storage.load("user");

//API Parameters
export const profileparams = "?_listings=true";
export const listingsparams = "?_seller=true&_bids=true&_active=true&sort=created&Order=desc";


//page elements
export const errorContainer = document.querySelector(".invalid-feedback content-font");
