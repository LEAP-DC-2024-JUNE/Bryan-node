const http = require("http");

let items = [];

let briefItems = [];
let detailedItems = [];

let currentId = 0;
let dataInitialized = false;

const initialize = () => {
  let briefContent = fs.readFileSync("dev-to/breif.json", "utf-8");
  briefItems = JSON.parse(briefContent);

  let detailedContent = fs.readFileSync("dev-to/data.json", "utf-8");
  detailedItems = JSON.parse(detailedItems);

  currentId = briefItems.reduce((a, b) => Math.max(a.id, b.id));

  dataInitialized = true;
};

const parseBody = () => {};
