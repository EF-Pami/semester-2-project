import { API_BASE_URL } from "../constants.mjs";
import { ALL_LISTINGS } from "../constants.mjs";

export async function deleteListing(listID) {
    try {
        const token = localStorage.getItem ('accessToken');
        const deleteData = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(`${API_BASE_URL}${ALL_LISTINGS}${listID}`, deleteData);

        if (response.status ===204 || response.status ===200) {
            alert (`List (ID ${listID}) was successfully deleted.`);
        } else {
            alert (`sorry, you do not have permission to delete this listing (ID ${listID})`);
        }
    } catch (error) {
        alert(`obbs! something went wrong, please try again later.`);
    }
}