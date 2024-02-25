import { register } from "./api/auth/register.mjs";
import { registrationForm } from "./constants.mjs";

// Registration Form

registrationForm.addEventListener("submit", register);