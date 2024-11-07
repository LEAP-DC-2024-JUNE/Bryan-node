const fs = require("node:fs");

let text = fs.readFileSync("./texts/read-this.txt", "utf-8");
console.log(text);

fs.writeFileSync("./texts/output.txt", text + "\nCreate a file successfully!");
console.log("Successfully written!");
