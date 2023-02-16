const express = require("express");
const pgQuery = require('postgresql-query')
const connection = require("../config/default.json");

pgQuery.config(connection.connectViaPgQueries); // Соединение с базой через postgresql-query
const router = express.Router({ mergeParams: true });

router.get("/rules-total-list", async (request, response)=>{
  const selectRules = "SELECT * FROM public.forseti_rules ORDER BY id ASC LIMIT 100"
  // const testRulesValue = [email]
  const rulesList = await pgQuery.query(selectRules)
  response
  .status(200)
  .send(rulesList);
})


module.exports = router;