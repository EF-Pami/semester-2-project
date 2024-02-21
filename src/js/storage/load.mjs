export const load = (key) => {
    let item = JSON.parse(localStorage.getItem(key));
    if (!item) {
        item = Storage.save(key, []);
    }
    return item;
};
