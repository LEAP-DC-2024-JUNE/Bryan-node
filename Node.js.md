**Node.js** is a environment for running JavaScript.
	It allows JavaScript to work in the Backend (without browser).
- JavaScript runtime environment
- V8 engine by Google Chrome

`node`: opens up environment to write JavaScript
`node <filename>.js`: runs `<filename>.js`

---
# File System
``` JavaScript
const fs = require("node:fs");

let text = fs.readFileSync("./test.txt", "utf-8");
console.log(text);

fs.writeFileSync("./output.txt", (text = "\nCreate a file successfully!"));
console.log("Successfully written!");
```
