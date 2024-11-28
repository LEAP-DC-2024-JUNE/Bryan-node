const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./configs/mongo-db");
const dotenv = require("dotenv").config({ path: "./configs/.env" });

const PORT = process.env.PORT;

const itemRouter = require("./routes/itemRouter");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/items", itemRouter);

connectMongoDB();

app.listen(PORT, () => console.log(`Started listening on port ${PORT}.`));
