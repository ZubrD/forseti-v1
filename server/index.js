// const express = require("express");
// const config = require("config");
// const chalk = require("chalk");
// const app = express();
// const port3001 = 3001;
// const PORT = config.get("port");

// const deputyModel = require("./deputyModel");
// const ruleModel = require("./ruleModel");
// const regionModel = require("./regionModel")


// app.use(express.json());
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Access-Control-Allow-Headers"
//   );
//   next();
// });

// app.get("/deputies", (req, res) => {
//   deputyModel
//     .getDeputy()
//     .then((response) => {
//       res.status(200).send(response);
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });

// app.listen(port3001, () => {
//   console.log(`App running on port ${port3001}.`);
// });



// app.get("/rules", (req, res) => {
//   ruleModel
//     .getRule()
//     .then((response) => {
//       res.status(200).send(response);
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });



// app.get("/regions", (req, res) => {
//   regionModel
//     .getRegion()
//     .then((response) => {
//       res.status(200).send(response);
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });

