const express = require("express");
const router = express.Router();

let items = [];
let currentId = 1;

// Create a new item
router.post("", (req, res) => {
  const { name, description } = req.body;
  const newItem = { id: currentId, name, description };
  currentId++;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read all items
router.get("", (req, res) => {
  res.json(items);
});

// Read a single item by id
router.get("/:id", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  const selectedItemIndex = items.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );
  if (selectedItemIndex === -1) {
    res.status(404).json({ error: "Item not found." });
  }
  items.splice(selectedItemIndex, 1);
  res.status(200).json({ message: "Item deleted." });
});

// router.listen(PORT, () => {
//   console.log("Server running on port " + PORT);
// });
module.exports = router;
