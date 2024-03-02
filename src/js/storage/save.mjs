export const save = (accessToken, value) => {
    localStorage.setItem(accessToken, JSON.stringify(value));
};

