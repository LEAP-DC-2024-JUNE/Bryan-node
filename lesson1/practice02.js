const max = (num1, num2) => (num1 > num2 ? num1 : num2);

const libraryMax = (num1, num2) => Math.max(num1, num2);

let x = 5,
  y = 8;

console.log(max(x, y));
console.log(libraryMax(x, y));
