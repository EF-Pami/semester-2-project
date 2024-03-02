

function updateLoginbtn() {
    const loginbtn = document.getElementById("loginbtn");
    const accessToken = localStorage.getItem("accessToken");

    try {
        if (loginbtn) {
            if (accessToken) {
                console.log('Userlogged in:', accessToken);
                loginbtn.textContent = 'Log out';
                loginbtn.href = '#';
                loginbtn.addEventListener('click', () => {
                    localStorage.removeItem('IsloggedIn');
                    localStorage.removeItem('username');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('avatar');
                    localStorage.removeItem('banner');
                    window.location.href = "/index.html";
                });
            } else {
                console.log('Not logged in');
                loginbtn.textContent = 'Login';
            }
        }
    } catch (error) {
        console.log('Error updating login button:', error.message);
    }
}

export { updateLoginbtn};
    