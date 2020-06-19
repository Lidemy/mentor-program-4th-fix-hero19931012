function printFactor(n) {
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      console.log(i);
    }
  }
}

printFactor(10);
