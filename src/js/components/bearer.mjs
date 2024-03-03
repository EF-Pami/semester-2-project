import * as storage from "../storage/index.mjs";
storage();
const accessToken = localstorage.get("accessToken");

export const options = {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
};
