const express = require("express");
const pgQuery = require("postgresql-query");
const connection = require("../config/default.json");
const querystring = require("querystring");
const { Http2ServerRequest } = require("http2");

pgQuery.config(connection.connectViaPgQueries); // Соединение с базой через postgresql-query
const router = express.Router({ mergeParams: true });

router.get("/rules-total-list", async (request, response) => {
  const selectRules =
    "SELECT * FROM public.forseti_rules ORDER BY id ASC LIMIT 100";
  // const testRulesValue = [email]
  const rulesList = await pgQuery.query(selectRules);
  response.status(200).send(rulesList);
});

router.get("/:ruleNumber", async (request, response) => {
  try {
    const { ruleNumber } = request.params;
    const selectOneRule =
      "SELECT * FROM public.forseti_rules WHERE rule_number=$1 ORDER BY id ASC";
    const oneRuleValue = [ruleNumber];
    const oneRule = await pgQuery.query(selectOneRule, oneRuleValue);
    response.status(200).send(oneRule);

  } catch (error) {
    response.send(error);
  }
});

module.exports = router;
