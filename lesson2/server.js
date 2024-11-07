const http = require("http");
const url = require("url");
const fs = require("fs");

let items;
// console.log(items);
let itemsBrief;
let currentId;

const DATA_PATH = "dev-data/data.json";
const BRIEF_PATH = "dev-data/brief.json";

const readFile = (path) => {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
};

const writeFile = (path, content) => {
  fs.writeFileSync(path, content);
};

const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => resolve(JSON.parse(body)));
    req.on("error", (err) => reject(err));
  });
};

items = readFile(DATA_PATH);
itemsBrief = readFile(BRIEF_PATH);
currentId = itemsBrief.reduce((a, b) => (a.id > b.id ? a : b)).id + 1;

const server = http.createServer(async (request, response) => {
  // Set CORS headers
  response.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins for development
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Allow specific HTTP methods
  response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers

  const pathname = url.parse(request.url, true).pathname;
  const method = request.method;

  // Handle OPTIONS requests for CORS preflight
  if (method === "OPTIONS") {
    response.writeHead(200); // Respond with 200 OK for preflight
    response.end();
    return; // End the response for the preflight request
  }

  if (pathname === "/api/items" && method === "POST") {
    // Create
    const data = await parseBody(request);
    console.log(data);
    const newItem = { id: currentId, ...data };
    const newBriefItem = {
      id: currentId++,
      productName: data.productName,
      image: data.image,
      price: data.price,
      organic: data.organic,
    };
    items.push(newItem);
    itemsBrief.push(newBriefItem);

    writeFile(DATA_PATH, JSON.stringify(items));
    writeFile(BRIEF_PATH, JSON.stringify(itemsBrief));

    response.writeHead(201, { "Content-Type": "application/json" });
    response.end(JSON.stringify(newItem));
  } else if (pathname === "/api/items" && method === "GET") {
    // Read all
    // console.log(JSON.stringify(items));
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(itemsBrief));
  } else if (pathname.startsWith("/api/items/") && method === "GET") {
    // Read a single item
    // console.log("GET for single method is called.");
    const id = parseInt(pathname.split("/").pop());
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(selectedItem));
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ Error: "Item not found" }));
    }
  } else if (pathname.startsWith("/api/items/") && method === "PUT") {
    // Update
    const id = parseInt(pathname.split("/").pop());
    const index = items.findIndex((item) => item.id === id);

    if (index != -1) {
      const data = await parseBody(request);
      items[index] = { ...items[index], ...data };
      const newItem = items[index];
      itemsBrief[index] = {
        id: newItem.id,
        productName: newItem.productName,
        image: newItem.image,
        price: newItem.price,
        organic: newItem.organic,
      };

      writeFile(DATA_PATH, JSON.stringify(items));
      writeFile(BRIEF_PATH, JSON.stringify(itemsBrief));

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(items[index]));
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ Error: "Item not found" }));
    }
  } else if (pathname.startsWith("/api/items/") && method === "DELETE") {
    // Delete
    console.log("Hello");
    const id = parseInt(pathname.split("/")[3]);
    const index = items.findIndex((item) => item.id === id);

    if (index != -1) {
      const deletedItem = items.splice(index, 1)[0];
      itemsBrief.splice(index, 1);

      writeFile(DATA_PATH, JSON.stringify(items));
      writeFile(BRIEF_PATH, JSON.stringify(itemsBrief));

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({ message: "Item deleted.", item: deletedItem })
      );
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ Error: "Item not found" }));
    }
    currentId = itemsBrief.reduce((a, b) => (a.id > b.id ? a : b)).id + 1;
  } else {
    // Page not found...
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end("Page not found.");
  }
  // response.end("Sample response");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Started listening to 127.0.0.1 on 8000...");
});
