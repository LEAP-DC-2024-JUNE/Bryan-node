const fs = require("fs");
const mysql = require("mysql");

detailedData = JSON.parse(fs.readFileSync("dev-data/original.json", "utf-8"));

const host = "localhost";
const port = 3306;
const user = "root";
const password = "/Bryan52!";
const database = "practice1";
const table = "Items";

let sqlStatement;

const createDatabase = (conn) => {
  sqlStatement = "CREATE DATABASE IF NOT EXISTS " + database;

  conn.query(sqlStatement, (err, result) => {
    if (err) throw err;
    if (result.warningCount == 0) console.log("Database created.");
  });
};

const createTable = (conn) => {
  sqlStatement =
    "CREATE TABLE " +
    database +
    "." +
    table +
    " ( id INT NOT NULL AUTO_INCREMENT, productName VARCHAR(50), origin VARCHAR(25), nutrients VARCHAR(100), quantity VARCHAR(15), price VARCHAR(10), organic BOOL, description VARCHAR(1000), PRIMARY KEY (id))";
  conn.query(sqlStatement, (err) => {
    if (err) throw err;
    console.log(`Table ${table} created.`);
  });
};

const dropTable = (conn) => {
  sqlStatement = `DROP TABLE IF EXISTS ${database}.${table}`;

  conn.query(sqlStatement, (err, result) => {
    if (err) throw err;
    if (result.warningCount == 0) console.log(`Table dropped.`);
  });
};

const insertData = (conn, data) => {
  data.map((item) => {
    let sqlStatement = `INSERT INTO ${database}.${table} (productName, origin, nutrients, quantity, price, organic, description) VALUES ('${
      item.productName
    }', '${item.from}', '${item.nutrients}', '${item.quantity}', '${
      item.price
    }', ${item.organic ? 1 : 0}, '${item.description.replace(/'/g, "''")}')`;

    conn.query(sqlStatement, (err, result) => {
      if (err) throw err;
      console.log("1 row inserted.");
    });
  });
};

const conn = mysql.createConnection({
  host: host,
  port: port,
  user: user,
  password: password,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Connection established.");

  createDatabase(conn);

  dropTable(conn);
  createTable(conn);

  insertData(conn, detailedData);

  conn.end((err) => {
    if (err) throw err;
    console.log("Connection ended.");
  });
});

// let sqlStatement =
//   ;

// const addData = () => {
//   conn.connect((err) => {
//     if (err) throw err;
//     console.log("Connection established.");
// detailedData.map((item, i) => {
//   let sqlStatement = `INSERT INTO Items (productName, origin, nutrients, quantity, price, organic, description) VALUES ('${
//     item.productName
//   }', '${item.origin}', '${item.nutrients}', '${item.quantity}', '${
//     item.price
//   }', ${item.organic ? 1 : 0}, '${item.description.replace(/'/g, "''")}')`;

//   conn.query(sqlStatement, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// });
//     conn.end((err) => {
//       if (err) throw err;
//       console.log("Connection ended.");
//     });
//   });
// };
// conn.connect((err) => {
//   if (err) throw err;
//   console.log("Connection established.");

//   conn.query(sqlStatement, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });

//   // End the connection
//   conn.end((err) => {
//     if (err) throw err;
//     console.log("Connection ended.");
//   });
// });
