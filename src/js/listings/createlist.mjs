import { API_BASE_URL } from "../constants.mjs";
import { ALL_LISTINGS } from "../constants.mjs";

export async function newlisting (Listtitle, Listcontent, accessToken) {
    try {
        const listData = {
            title: Listtitle,
            body: Listcontent,
        };

        if (!accessToken) {
            return;
        }

        const response = await fetch (`${API_BASE_URL}${ALL_LISTINGS}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify (listData),
        });

        if (response.ok) {
            const newPost = await response.json();
            window.location.href = '/listings.hmtl';
            return newPost
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}