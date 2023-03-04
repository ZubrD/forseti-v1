const express = require("express");
const pgQuery = require("postgresql-query");
const connection = require("../config/default.json");

pgQuery.config(connection.connectViaPgQueries); // Соединение с базой через postgresql-query
const router = express.Router({ mergeParams: true });

router.get("/:ruleNumber", async (request, response)=>{
  try{
    const {ruleNumber} = request.params

    const selRuleId = "SELECT id FROM public.forseti_rules WHERE rule_number=$1"
    const selRuleIdVal = [ruleNumber]
    const ruleId = await pgQuery.query(selRuleId, selRuleIdVal)
    const ruleIdInt = ruleId[0].id

    const selComm = "SELECT name, text, date1 FROM public.forseti_comments WHERE rule_id=$1"
    const selCommVal = [ruleIdInt]
    const comments = await pgQuery.query(selComm, selCommVal)
    response.status(200).send(comments)
  } catch(error){
    console.log(error)
  }
})

router.post("/add", async (request, response) => {
    const {text, name} = request.body;
    const ruleId = "21";
    const insertComment =
      "INSERT INTO public.forseti_comments (name, text, rule_id) VALUES ($1, $2, $3)";
    const insertCommentVal = [name, text, ruleId];
    try {
      await pgQuery.query(insertComment, insertCommentVal);
      response.status(200).send("Комментарий отправлен");
    } catch (error) {
      console.log(error)
      return response.status(400).send({
        error: {
          message: "Ошибка отправки комментария",
          code: 499,
        },
      });
    }
  });

  module.exports = router;