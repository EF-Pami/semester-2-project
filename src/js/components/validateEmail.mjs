/**
 * codes check if email is a valid noroff email
 * @param {string} email
 * @returns boolean
 * @example
 * ``js
 * validateEmail ("leo@stud.noroff.no")
 * // result return true
 */

export function validateEmail(email) {
  const noroffEmailRegex = /^(.+)@(noroff\.no|stud\.noroff\.no)$/;
  const patternMatches = noroffEmailRegex.test(email);
  return patternMatches;
}
