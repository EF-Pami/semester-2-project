import * as storage from "../storage/index.mjs";

const accessToken = storage.load("accessToken");

export const options = {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
};
