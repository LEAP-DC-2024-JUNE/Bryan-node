const express = require("express");
const router = express.Router();
const db = require("../database");
const moment = require("moment");

const parseResult = (result) => {
  let expenses = result.map((expense) => {
    const { pk_id, c_date, c_description, fk_expense_type, c_amount } = expense;
    const types = ["Food", "Entertainment", "Transportation", "Accommodation"];

    return {
      id: pk_id,
      date: moment(c_date).format("YYYY-MM-DD"),
      description: c_description,
      type: types[fk_expense_type - 1],
      amount: parseFloat(c_amount),
    };
  });
  return expenses;
};

// Create
router.post("", (request, response) => {
  const { date, description, type, amount } = request.body;
  const types = ["Food", "Entertainment", "Transportation", "Accommodation"];
  let typeId = types.findIndex((t) => t == type) + 1;
  const sql =
    "INSERT INTO tb_expenses (c_date, c_description, fk_expense_type, c_amount) VALUES (?, ?, ?, ?)";
  db.query(sql, [date, description, typeId, amount], (err, result) => {
    if (err) {
      console.log("Error occured while inserting a new expense.");
      response.status(500).json({ message: err.message });
    }
    response.status(201).json({ message: "Expense is added." });
  });
});

// Read all
router.get("", (request, response) => {
  const sql = "SELECT * FROM tb_expenses";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Error occured while reading all expenses.");
      response.status(500).json({ message: err.message });
    }
    const expenses = parseResult(result);
    response.json(expenses);
  });
});

// Read single
router.get("/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const sql = "SELECT * FROM tb_expenses WHERE pk_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Error occured while reading a single expense.");
      response.status(500).json({ message: err.message });
    }
    const expenses = parseResult(result);
    response.json(expenses[0]);
  });
});

// Update
router.put("/:id", (request, response) => {
  const id = request.params.id;
  const { date, description, type, amount } = request.body;
  const types = ["Food", "Entertainment", "Transportation", "Accommodation"];
  let typeId = types.findIndex((t) => t == type) + 1;
  const sql =
    "UPDATE tb_expenses SET c_date = ?, c_description = ?, fk_expense_type = ?, c_amount = ? WHERE pk_id = ?";
  db.query(sql, [date, description, typeId, amount, id], (err, result) => {
    if (err) {
      console.log("Error occured while updating an expense.");
      response.status(500).json({ message: err.message });
    }
    response.json({ message: "Expense updated." });
  });
});

// Delete
router.delete("/:id", (request, response) => {
  const id = request.params.id;
  const sql = "DELETE FROM tb_expenses WHERE pk_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Error occured while deleting an expense.");
      response.status(500).json({ message: err.message });
    }
    response.json({ message: "Expense deleted." });
  });
});

module.exports = router;
