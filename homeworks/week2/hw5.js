/* eslint-disable no-plusplus */
function join(arr, concatStr) {
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result += concatStr;
    result += arr[i];
  }
  return result;
}

function repeat(str, times) {
  let result = '';
  for (let i = 1; i <= times; i++) {
    result += str;
  }
  return result;
}

console.log(join([1, 2, 3], '!'));
console.log(join(['a', 'b', 'c'], '!'));
console.log(join(['a', 1, 'b', 2, 'c', 3], ','));
console.log(repeat('a', 5));
console.log(repeat('yoyo', 2));
