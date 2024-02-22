import { API_BASE_URL } from "../../constants.mjs";

export async function registerUser(profile) {
    const action = '/auth/register';
    const method = 'POST';

    try {
        const regitserURL = API_BASE_URL + action;
        const body = JSON.stringify(profile);

        const response = await fetch (regitserURL, {
            headers: {
                'content-Type': 'application/json'
            },
            method,
            body,
        });

        if (response.ok) {
            window.location.href = '/profile/login/index.html';
        } else {
            throw new Error('Registration failed')
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error('Registration error:' + error.message)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    registrationForm.addEventListener('submit', async function (event) {
        event.preventDefault();
    
        const nameInput = document.getElementById('name');
        const passwordInput = document.getElementById('password');
    
        const user = {
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        };

        const isValidNoroffEmail = isValidEmail(user.email);

        if (!isValidNoroffEmail) {
            emailError.style.display = 'block';
            return; 
        }
        emailError.style.display = 'none';

        await registerUser(`${API_BASE_URL}/auth/register`, user)
});

function isValidEmail(email) {
    const noroffEmailRegex = /^(.+)@(noroff\.no|stud\.noroff\.no)$/;
    return noroffEmailRegex.test(email);
  }
});