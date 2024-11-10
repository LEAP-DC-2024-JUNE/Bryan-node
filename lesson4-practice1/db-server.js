const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 8000;

const itemsRouter = require("./routes/items");

app.use(cors());
app.use(express.json());
app.use("/api/items", itemsRouter);

app.listen(PORT, () => console.log("Started running on port " + PORT));
