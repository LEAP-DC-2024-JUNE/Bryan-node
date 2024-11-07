/**
 * Practice: Asynchronous file read
 * 1. Creat a new file name 'file-system-async.js'
 * 2. Read the file named 'read-this.txt' asynchronously, and print the file
 */
const fs = require("node:fs");
// import { writeFile } from "node:fs";
// import { Buffer } from "node:buffer";
let text;

fs.readFile("./texts/read-this.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("Error occurred while reading this...", err);
  }
  console.log(data);
  text = data;
  fs.writeFile(
    "./texts/output-async.txt",
    data + "\nWritten asynchronously",
    "utf-8",
    (err) => {
      if (err) {
        console.log("Error occurred while reading this...", err);
      }
      console.log("The file has been saved!");
    }
  );
});
console.log("Started reading...");

/**
 * Practice 2: Asynchronous file write
 * writeFile(...)
 * "./texts/output-async.txt"
 */
// const data = Buffer.from("./texts/read-this.txt");
