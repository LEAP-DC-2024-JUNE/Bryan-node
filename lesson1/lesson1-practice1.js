const fs = require("node:fs");

const reverse = (value) => {
  let result = "";
  for (let i = value.length - 1; i >= 0; i--) {
    result += value[i];
  }
  return result;
};

const text = fs.readFileSync("./texts/input.txt", "utf-8");
console.log(text);

fs.writeFileSync("./texts/output-result.txt", reverse(text));
const outputText = fs.readFileSync("./texts/output-result.txt", "utf-8");
console.log(outputText);
