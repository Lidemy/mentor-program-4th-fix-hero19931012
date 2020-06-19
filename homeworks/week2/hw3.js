function reverse(str) {
  let result = '';
  // eslint-disable-next-line no-plusplus
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  console.log(result);
}

reverse('hello');
reverse('yoyoyo');
reverse('1abc2');
reverse('1,2,3,2,1');
