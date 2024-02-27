import { API_BASE_URL } from "../constants.mjs";
import { ALL_LISTINGS } from "../constants.mjs";

export async function updateList (listID, updatedtitle, updatedbody) {
    try {
        const updatedListData = {
            title: updatedtitle,
            body: updatedbody
        };

        const token = localStorage.getItem('accessToken');
        const updatedData = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedListData),
        };

        const response = await fetch(`${API_BASE_URL}${ALL_LISTINGS}${listID}`, updatedData);

        if (response.ok) {
            alert('Listing updated');
        } else {
            alert('Unsuccessful update, please try again later.');
        }
    } catch (error) {
        alert ('An error occured during listing update, please try again.');
    }
}