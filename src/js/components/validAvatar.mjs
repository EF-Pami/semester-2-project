/**
 * checking if avatar is valid image
 * @param {string} avatar
 * @returns image
 * expect return image if the passed is valid and a placeholder avatar if image not valid
 */

export function validAvatar(avatar) {
  let userAvatar;
  if (avatar !== "" && avatar) {
    userAvatar = avatar;
  } else {
    userAvatar =
      "https://media.istockphoto.com/id/1128926343/vector/head-of-businessman-abstract-geometric-avatar-face-icon-isolated-vector-flat-design.jpg?s=2048x2048&w=is&k=20&c=62Dv9t_dZ6-vcsp3koxpBBdIuSUoEZUq7lqwN9z40pY=";
  }
  return userAvatar;
}
