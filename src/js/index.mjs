import { login } from "./api/auth/login.mjs";
//import { register } from "./api/auth/register.mjs";
import { loginForm, registrationForm } from "./constants.mjs";

// Registration Form

//registrationForm.addEventListener("submit", register);

loginForm.addEventListener("submit", login);