import { save } from "./save.mjs";

export const load = (key) => {
    let item = JSON.parse(localStorage.getItem(key));
    if (!item) {
        item =save(key, []);
    }
    return item;
};
