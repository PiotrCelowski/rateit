export function capitalize(string = '') {
  /*
  * -- this function doing the same as { capitalize } from "@mui/material" --
  * E.g. 'javaScript' => return 'JavaScript'
  */
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeFewWords(string = '') {
  /*
  * -- Capitalizes every first letter in sentense --
  * E.g. 'javaScript with ReactJS' => return 'JavaScript With ReactJS'
  */
  return string.split(' ').map((substring) => capitalize(substring)).join(' ')
}
