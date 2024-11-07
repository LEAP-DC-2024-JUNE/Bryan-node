const express = require("express");
const app = express();
const PORT = 3003;

const itemsRouter = require("./routes/items");

app.use(express.json());
app.use("/api/items", itemsRouter);

app.listen(PORT, () => console.log("Started running on port " + PORT));
