const express = require("express");
const config = require('config');
const chalk = require("chalk");
const cors = require('cors')
const app = express();
const PORT = config.get('port');
const { Pool } = require("pg");
const routes = require('./routes')
const path = require('path')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/api', routes)

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

if(process.env.NODE_ENV === 'production'){      // Здесь начинается переход к запуску проекта только со стороны сервера
  app.use('/', express.static(path.join(__dirname, 'client')))

  const indexPath = path.join(__dirname, 'client', 'index.html')

  app.get('*', (request, response)=>{
    response.sendFile(indexPath)
  })
}

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
