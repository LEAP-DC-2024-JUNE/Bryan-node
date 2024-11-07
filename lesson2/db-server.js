const http = require("http");
const url = require("url");
const mysql = require("mysql");

const readData = async (id = 0) => {
  const conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "/Bryan52!",
    database: "practice1",
  });

  try {
    // Connect to the database
    await new Promise((resolve, reject) => {
      conn.connect((err) => {
        if (err) return reject(err);
        console.log("Connection established.");
        resolve();
      });
    });

    // Query the database
    const result = await new Promise((resolve, reject) => {
      let sqlStatement = "SELECT * FROM Items";
      if (id != 0) sqlStatement += " WHERE id=" + id;
      conn.query(sqlStatement, (err, result) => {
        if (err) return reject(err);
        console.log("Items retreived.");
        resolve(JSON.parse(JSON.stringify(result)));
      });
    });

    return result;
  } catch (err) {
    console.error("Database error:", err);
  } finally {
    // Close the connection
    conn.end((err) => {
      if (err) console.error("Error ending the connection:", err);
      else console.log("Connection ended.");
    });
  }
};

const insertData = (data) => {
  const conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "/Bryan52!",
    database: "practice1",
  });

  conn.connect((err) => {
    if (err) throw err;
    console.log("Connection established.");

    let sqlStatement = `INSERT INTO Items (productName, origin, nutrients, quantity, price, organic, description) VALUES ('${
      data.productName
    }', '${data.from}', '${data.nutrients}', '${data.quantity}', '${
      data.price
    }', ${data.organic ? 1 : 0}, '${
      data.description && data.description.replace(/'/g, "''")
    }')`;
    conn.query(sqlStatement, (err) => {
      if (err) throw err;
      console.log("1 row inserted.");
    });

    conn.end((err) => {
      if (err) throw err;
      console.log("Connection ended.");
    });
  });
};

const deleteData = (id) => {
  const conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "/Bryan52!",
    database: "practice1",
  });

  conn.connect((err) => {
    if (err) throw err;
    console.log("Connectioin established to delete an item.");

    const sqlStatement = "DELETE FROM Items WHERE Id = " + id;
    conn.query(sqlStatement, (err, result) => {
      if (err) throw err;
      return result.affectedRows;
    });

    conn.end((err) => {
      if (err) throw err;
      console.log("Connection ended (delete).");
    });
  });
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

const server = http.createServer(async (request, response) => {
  // Set CORS Headers
  response.setHeader("Access-Control-Allow-Origin", "*"); //Allow all origins for development
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Allow specific HTTP methods
  response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific header

  const pathname = url.parse(request.url, true).pathname;
  const method = request.method;

  // Handle OPTIONS request for CORS preflight
  if (method === "OPTIONS") {
    response.writeHead(200);
    response.end();
    return;
  }

  if (pathname === "/api/items" && method === "POST") {
    const data = await parseBody(request);

    insertData(data);

    response.writeHead(201);
    response.end("Item was added.");
  } else if (pathname === "/api/items" && method === "GET") {
    const data = await readData();

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(data));
  } else if (pathname.startsWith("/api/items/") && method === "GET") {
    const id = parseInt(pathname.split("/")[3]);
    const data = await readData(id);

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(data));
  } else if (pathname.startsWith("/api/items/") && method === "DELETE") {
    const id = parseInt(pathname.split("/")[3]);
    const rows = await deleteData(id);

    if (rows == 0) {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ 404: "Item not found." }));
    }
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Item deleted." }));
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ 404: "Page not found." }));
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Started listening to 127.0.0.1 on 8000...");
});
