const express = require("express");
const app = express();
const PORT = 3002;

app.use(express.json());

let items = [];
let currentId = 1;

// Create a new item
app.post("/api/items", (req, res) => {
  const { name, description } = req.body;
  const newItem = { id: currentId, name, description };
  currentId++;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// Read a single item by id
app.get("/api/items/:id", (req, res) => {
  const selectedItem = items.find(
    (item) => item.id === parseInt(req.params.id)
  );
  if (selectedItem) {
    res.json(selectedItem);
  } else {
    res.status(404).json({ error: "Item not found." });
  }
});

// Update an item by id
app.put("/api/items/:id", (req, res) => {
  const selectedItem = items.find(
    (item) => item.id === parseInt(req.params.id)
  );
  if (!selectedItem) {
    res.status(404).json({ error: "Item not found." });
  }
  const { name, description } = req.body;
  selectedItem.name = name;
  selectedItem.description = description;
  res.json(selectedItem);
});

// Delete an item by id
app.delete("/api/items/:id", (req, res) => {
  const selectedItemIndex = items.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );
  if (selectedItemIndex === -1) {
    res.status(404).json({ error: "Item not found." });
  }
  items.splice(selectedItemIndex, 1);
  res.status(200).json({ message: "Item deleted." });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
