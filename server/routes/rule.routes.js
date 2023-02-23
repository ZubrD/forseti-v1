const express = require("express");
const pgQuery = require("postgresql-query");
const connection = require("../config/default.json");

pgQuery.config(connection.connectViaPgQueries); // Соединение с базой через postgresql-query
const router = express.Router({ mergeParams: true });

router.get("/rules-total-list", async (request, response) => {
  const selectRules =
    "SELECT * FROM public.forseti_rules ORDER BY id ASC LIMIT 100";
  const rulesList = await pgQuery.query(selectRules);
  response.status(200).send(rulesList);
});

router.get("/prefer/:ruleNumber", async (request, response) => {
  // Нужность конкретного закона
  const { ruleNumber } = request.params;
  const selectPrefer =
    "SELECT COUNT (*) FROM public.forseti_prefer WHERE rule=$1";
  const selectPreferValue = [ruleNumber];
  const countPrefer = await pgQuery.query(selectPrefer, selectPreferValue);
  response.status(200).send(countPrefer);
});

router.get("/:ruleNumber/:userId", async (request, response) => {
  try {
    const { ruleNumber, userId } = request.params;
    const selectOneRule =
      "SELECT * FROM public.forseti_rules WHERE rule_number=$1 ORDER BY id ASC";
    const oneRuleValue = [ruleNumber];
    const oneRule = await pgQuery.query(selectOneRule, oneRuleValue);

    const selectUser = "SELECT username FROM public.auth_user WHERE my_id=$1";
    const selectUserValue = [userId];
    const user = await pgQuery.query(selectUser, selectUserValue);

    const currentUser = user[0].username;
    const oneRuleNumber = oneRule[0].rule_number;

    const selectPrefer =
      "SELECT * FROM public.forseti_prefer WHERE person=$1 AND rule=$2";
    const selectPreferValue = [currentUser, oneRuleNumber];
    const prefer = await pgQuery.query(selectPrefer, selectPreferValue);
    let preferOrNot;
    prefer.length > 0 ? (preferOrNot = true) : (preferOrNot = false);

    const selectNotPrefer =
      "SELECT * FROM public.forseti_notprefer WHERE person=$1 AND rule=$2";
    const selectNotPreferValue = [currentUser, oneRuleNumber];
    const notPrefer = await pgQuery.query(
      selectNotPrefer,
      selectNotPreferValue
    );
    let notPreferOrNot;
    notPrefer.length > 0 ? (notPreferOrNot = true) : (notPreferOrNot = false);

    const preferCount =
      "SELECT COUNT (*) FROM public.forseti_prefer WHERE rule=$1";
    const preferCountVal = [ruleNumber];
    const countPrefer = await pgQuery.query(preferCount, preferCountVal);

    const notPreferCount =
      "SELECT COUNT (*) FROM public.forseti_notprefer WHERE rule=$1";
    const notPreferCountVal = [ruleNumber];
    const countNotPrefer = await pgQuery.query(
      notPreferCount,
      notPreferCountVal
    );

    const ruleId = oneRule[0].id;
    const selComments =
      "SELECT * FROM public.forseti_comments WHERE rule_id=$1";
    const selCommentsVal = [ruleId];
    const ruleComments = await pgQuery.query(selComments, selCommentsVal);

    response.status(200).send({
      oneRule: oneRule,
      currUser: currentUser,
      prefer: preferOrNot,
      notPrefer: notPreferOrNot,
      countPrefer: countPrefer[0].count,
      countNotPrefer: countNotPrefer[0].count,
      comments: ruleComments
    });
  } catch (error) {
    response.send(error);
  }
});

module.exports = router;
