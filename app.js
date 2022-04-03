const express = require("express");
const app = express();
const port = 3000;

const schemas = require("./schemas");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
// just for testing, yet to be done
app.post("/abi", middleware(schemas.abis, "body"), function (req, res) {
  res.json(req.body);
});
app.post(
  "accountbalance",
  middleware(schemas.AEevents, "body"),
  function (req, res) {
    res.json(req.body);
  }
);
app.post(
  "/adminevent",
  middleware(schemas.AEevents, "body"),
  function (req, res) {
    res.json(req.body);
  }
);
app.post(
  "/monitoringcakks",
  middleware(schemas.AEevents, "body"),
  function (req, res) {
    res.json(req.body);
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
