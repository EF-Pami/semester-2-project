import { API_BASE_URL } from "../../constants.mjs";
import { API_REGISTER_URL } from "../../constants.mjs";

// loading DOM first 

document.addEventListener('DOMContentLoaded', () => {
    
    //getting form elements

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const avatarInput = document.getElementById('avatar');
    const signUpButton = document.getElementById('signup');


    // Funtion to validate the form

    function validateForm() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const avatar = avatarInput.files[0];
    
        if (name === '') {
        showError('Name is required');
        return false;
        }
    
        if (email === '') {
        showError('Email is required');
        return false;
        }
    
        if (!validateEmail(email)) {
        showError('Invalid email');
        return false;
        }

        if (password === '') {
            showError('Password is required');
            return false;
        }
        
        if (!avatar) {
            showError('Avatar is required');
            return false;
        }
        
        return true;
    }

    // function to validate email

    function validateEmail(email) {
        const regex = /[\w\-.]+@stud.noroff.no$/;
        return regex.test(email);
    }

    // function to display error message

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.textContent = message;
        document.getElementById('error-message').appendChild(errorDiv);
    }

    // Function to clear error message

    function clearError() {
        const errorMessage = document.getElementById('error-message');
        while (errorMessage.firstChild) {
        errorMessage.removeChild(errorMessage.firstChild);
        }
    }

    // function to handle form submission

    async function registerUser(event) {
        event.preventDefault();
    
        if (validateForm()) {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const avatar = avatarInput.files[0];
    
        try {
            //Create a new FormData object
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('avatar', avatar);

            // send the data to the API
            const response = await fetch(`${API_BASE_URL}${API_REGISTER_URL}`, {
            method: 'POST',
            body: formData,
            headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
            // Sign up successful, redirect to dashboard or show success message
            window.location.href = '/Profile/login.html';
            } else {
            // Show error message from server response
            const errorMessage = await response.text();
            showError(errorMessage);
            }
        } catch (error) {
            // Show error message from caught error
            showError(error.message);
        }
        }
    }

    //Adding event listener
    signUpButton.addEventListener('click', registerUser)

});

/*import { validAvatar} from "../../components/validAvatar.mjs";




async function registerUser(API_BASE_URL, data) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(API_BASE_URL, postData);
        const json = await response.json();

        if (response.ok) {
            window.location.href = '/Profile/login/index.html';
        } else {
        }
        return json;
    } catch (error) {

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

        //validate the user avatar
        //const userAvatar = validAvatar(avatar.value);
    
        const user = {
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
          //avatar: userAvatar,
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
    const noroffEmailRegex = [\w\-.]+@stud.noroff.no$;
    return noroffEmailRegex.test(email);
  }
});*/