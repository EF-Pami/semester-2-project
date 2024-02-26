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
  const Regex = /[\w\-\.]+@(stud\.?noroff)\.no/;
  const patternMatches = Regex.test(email);
  return patternMatches;
}
