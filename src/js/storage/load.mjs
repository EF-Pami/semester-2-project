import { save } from "./save.mjs";

export const load = (accessToken) => {
    let item = JSON.parse(localStorage.getItem(accessToken));
    if (!item) {
        item =save(accessToken, []);
    }
    return item;
};
