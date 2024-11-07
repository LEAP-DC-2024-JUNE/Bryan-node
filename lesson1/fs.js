const fs = require("node:fs");

fs.readFile("./texts/read-this1.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error occurred while reading file...", err);
  }
  console.log(data);
});
