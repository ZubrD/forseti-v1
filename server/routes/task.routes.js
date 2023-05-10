const express = require("express");
const pgQuery = require("postgresql-query");
const connection = require("../config/default.json");

pgQuery.config(connection.connectViaPgQueries); // Соединение с базой через postgresql-query
const router = express.Router({ mergeParams: true });

router.get("/task-list", async (request, response) => {
  try {
    const selectTask =
      "SELECT * FROM public.forseti_taskfordeputy ORDER BY id ASC";
    const taskList = await pgQuery.query(selectTask);
    response.status(200).send(taskList);
  } catch(error) {

  }
});

module.exports = router;
