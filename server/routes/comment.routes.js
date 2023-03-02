const express = require("express");
const pgQuery = require("postgresql-query");
const connection = require("../config/default.json");

pgQuery.config(connection.connectViaPgQueries); // Соединение с базой через postgresql-query
const router = express.Router({ mergeParams: true });

router.post("/add", async (request, response) => {
    const {comment, username} = request.body;
    const ruleId = "21";
    const insertComment =
      "INSERT INTO public.forseti_comments (name, text, rule_id) VALUES ($1, $2, $3)";
    const insertCommentVal = [username, comment, ruleId];
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