require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const insertItem = (item) => {
  let insertItemStatement = `INSERT INTO practice1.Items
            (productName, origin, nutrients, quantity,
                price, organic, description)
            VALUES (
                '${item.productName}',
                '${item.from}',
                '${item.nutrients}',
                '${item.quantity}',
                '${item.price}',
                ${item.organic ? 1 : 0},
                '${item.description.replace(/'/g, "''")}'
            )`;
  const conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: "practice1",
  });

  conn.connect((err) => {
    if (err) throw err;
    console.log("Conection to database established. (Insert)");

    conn.query(insertItemStatement, (err, result) => {
      if (err) throw err;
      console.log("Item added.");
    });

    conn.end((err) => {
      if (err) throw err;
      console.log("Connection to database ended. (Insert)");
    });
  });
};

const selectAllItems = () => {
  const selectAllItemsStatement =
    "SELECT id, productName, price, organic FROM Items";

  const conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: "practice1",
  });

  conn.connect((err) => {
    if (err) throw err;
    console.log("Connection to database established. (Select all)");

    conn.query(selectAllItemsStatement, (err, result) => {
      if (err) throw err;
      result.map((item) => console.log(item));
      return result;
    });

    conn.end((err) => {
      if (err) throw err;
      console.log("Connection to database ended. (Select all)");
    });
  });
};

router.post("", (req, res) => {
  insertItem(req.body);

  res.status(201).json({ message: "Item created." });
});

router.get("", (req, res) => {
  const data = selectAllItems();
  const items = [];

  res.json(items);
});

module.exports = router;
