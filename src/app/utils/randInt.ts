export const randInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// https://stackoverflow.com/a/19270021
export const randInts = (max: number, n: number) => {
  var result = new Array(n),
    taken = new Array(max);
  while (n--) {
    const r = Math.floor(Math.random() * max);
    result[n] = r in taken ? taken[r] : r;
    taken[r] = --max in taken ? taken[max] : max;
  }
  return result.map((x) => x + 1);
};
