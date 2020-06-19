function search(arr, n) {
  let L = 0;
  let R = arr.length - 1;

  while (R >= L) {
    const M = Math.floor((L + R) / 2);
    if (arr[M] === n) {
      return M;
    }
    if (n > arr[M]) {
      L = M + 1;
    } else if (n < arr[M]) {
      R = M - 1;
    }
  }
  return -1;
}

console.log(search([1, 3, 10, 14, 39], 39));
console.log(search([1, 3, 10, 14, 39], 299));
