/**
 * function to check that image is valid
 * @param {string} img
 * @returns image
 */

export function validImage(img) {
    let image;

    if (img !== "" && img) {
        image = img;
    } else {
        image = "https://cdn.discordapp.com/attachments/931268688412299274/1026475078847823972/Hero-Banner-Placeholder-Dark-1024x480-1.png";
    }
    return image;
}