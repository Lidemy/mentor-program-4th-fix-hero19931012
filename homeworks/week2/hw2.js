function capitalize(str) {
  const codeOfHead = str.charCodeAt(0);
  let result = '';
  if (codeOfHead >= 97 && codeOfHead <= 122) {
    result = String.fromCharCode(codeOfHead - 32);
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < str.length; i++) {
      result += str[i];
    }
  }
  return result || str;
}

console.log(capitalize('hello'));
