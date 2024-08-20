// @ts-nocheck

export const randInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randItem = (items: any[]) => {
  return items[randInt(0, items.length - 1)];
};

// https://stackoverflow.com/a/19270021
export const randInts = (max: number, n: number) => {
  var result = new Array(n),
    taken = new Array(max);
  while (n--) {
    const r = randInt(0, max - 1);
    result[n] = r in taken ? taken[r] : r;
    taken[r] = --max in taken ? taken[max] : max;
  }
  return result.map((x) => x + 1);
};

export const shuffle = (x: any[]) => {
  return x.slice().sort((a, b) => 0.5 - Math.random());
};

export const sort = (items: { description: string; value: string }[]) => {
  return items.slice().sort((a, b) => parseInt(a.value) - parseInt(b.value));
};

export const capitalize = (description: string) => {
  return description.charAt(0).toUpperCase() + description.slice(1);
};

export const indexItems = (items: { description: string; value: string }[]) => {
  return items.map((item, idx) => ({ idx, item }));
};

export const equal = (
  item1: { description: string; value: string },
  item2: { description: string; value: string }
) => {
  return item1.description === item2.description && item1.value === item2.value;
};

// https://stackoverflow.com/a/66938952

export const encrypt = (salt, text) => {
  const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
  const byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return text
    .split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
};

export const decrypt = (salt, encoded) => {
  const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join('');
};

export const itemStylesClassNames = [
  'text-black bg-amber-50 focus:ring-4 font-medium rounded-lg text-m px-5 py-2.5 text-center me-2 mb-2',
  'text-black bg-green-50 focus:ring-4 font-medium rounded-lg text-m px-5 py-2.5 text-center me-2 mb-2',
  'text-black bg-teal-50 focus:ring-4 font-medium rounded-lg text-m px-5 py-2.5 text-center me-2 mb-2',
  'text-black bg-sky-50 focus:ring-4 font-medium rounded-lg text-m px-5 py-2.5 text-center me-2 mb-2',
  'text-black bg-blue-50 focus:ring-4 font-medium rounded-lg text-m px-5 py-2.5 text-center me-2 mb-2',
];
