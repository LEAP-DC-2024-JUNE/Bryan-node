const hello = "Hello World!";
const reverse = (value) => {
  let result = "";
  for (let i = value.length - 1; i >= 0; i--) {
    result += value[i];
  }
  return result;
};
console.log(hello);
console.log(reverse(hello));
