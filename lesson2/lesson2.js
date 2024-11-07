const http = require("http");
const fs = require("fs");
/**
 * 1. Web Server
 * 2. IP Address, Port
 * 3. Routing
 */

const data = fs.readFileSync("dev-data/data.json", "utf-8");

const brief = fs.readFileSync("dev-data/brief.json", "utf-8");

const server = http.createServer((req, res) => {
  let path = req.url;
  if (path === "/home" || path === "/" || path === "") {
    res.end("Hello, this is from the home page.");
  } else if (path === "/fruit") {
    res.end("Hey yoo! This is from the fruit page.");
  } else if (path === "/test") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Test");
    res.end();
  } else if (path === "/api/data") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  } else if (path === "/api/brief") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(brief);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("Page not found.");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000...");
});
