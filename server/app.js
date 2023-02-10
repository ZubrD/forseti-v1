const express = require("express");
const config = require('config');
const chalk = require("chalk");
const app = express();
const PORT = config.get('port');
const { Pool } = require("pg");
const routes = require('./routes')

const deputyModel = require("./deputyModel");
const ruleModel = require("./ruleModel");
const regionModel = require("./regionModel")


app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

async function start() {
  try {
    new Pool(config.get("connectDb"));
    console.log(chalk.yellow("Database PostgreSQL connected"));
    app.listen(PORT, () => {
      console.log(chalk.green(`App running on port ${PORT}.`));
    });
  } catch (e) {
    console.log(chalk.red("Connection error: ", e.message));
    process.exit(1);
  }
}

start();


app.get("/deputies", (req, res) => {
  deputyModel
    .getDeputy()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/rules", (req, res) => {
  ruleModel
    .getRule()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});



app.get("/regions", (req, res) => {
  regionModel
    .getRegion()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});