const express = require("express");
const pgQuery = require("postgresql-query");
const connection = require("../config/default.json");

pgQuery.config(connection.connectViaPgQueries); // Соединение с базой через postgresql-query
const router = express.Router({ mergeParams: true });

router.get("/rules-total-list", async (request, response) => {
  // const selectRules =
  //   "SELECT * FROM public.forseti_rules ORDER BY id ASC LIMIT 100";
  const selectRules =
    "SELECT title, rule_number FROM public.forseti_rules ORDER BY id ASC";
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

router.post("/setPrefer", async (request, response) => {
  const { num, user } = request.body;
  const insPref =
    "INSERT INTO public.forseti_prefer (person, rule) VALUES ($1, $2)";
  const insPrefVal = [user, num];
  try {
    await pgQuery.query(insPref, insPrefVal);
    response.status(200).send("Вы проголосовали за нужность закона");
  } catch (error) {
    console.log(error);
    return response.status(400).send({
      error: {
        message: "Ошибка при голосовании за нужность закона",
        code: 499,
      },
    });
  }
});

router.post("/unSetPrefer", async (request, response) => {
  const { num, user } = request.body;
  const delPref =
    "DELETE FROM public.forseti_prefer WHERE person=$1 AND rule=$2";
  const delPrefVal = [user, num];
  try {
    await pgQuery.query(delPref, delPrefVal);
    response.status(200).send("Вы отменили голосование за нужность закона");
  } catch (error) {
    console.log(error);
    return response.status(400).send({
      error: {
        message: "Ошибка при отмене голосования за нужность закона",
        code: 499,
      },
    });
  }
});

router.post("/setNotPrefer", async (request, response) => {
  const { num, user } = request.body;
  const insNotPref =
    "INSERT INTO public.forseti_notprefer (person, rule) VALUES ($1, $2)";
  const insNotPrefVal = [user, num];
  try {
    await pgQuery.query(insNotPref, insNotPrefVal);
    response.status(200).send("Вы проголосовали за НЕнужность закона");
  } catch (error) {
    console.log(error);
    return response.status(400).send({
      error: {
        message: "Ошибка при голосовании за НЕнужность закона",
        code: 499,
      },
    });
  }
});

router.post("/unSetNotPrefer", async (request, response) => {
  const { num, user } = request.body;
  const delUnPref =
    "DELETE FROM public.forseti_notprefer WHERE person=$1 AND rule=$2";
  const delUnPrefVal = [user, num];
  try {
    await pgQuery.query(delUnPref, delUnPrefVal);
    response.status(200).send("Вы отменили голосование за НЕнужность закона");
  } catch (error) {
    console.log(error);
    return response.status(400).send({
      error: {
        message: "Ошибка при отмене голосования за НЕнужность закона",
        code: 499,
      },
    });
  }
});

router.post("/setUserVote", async (request, response) => {
  const { result, user, ruleNumber } = request.body;
  const insVote =
    "INSERT INTO public.forseti_voxpopuli (name, rule_number, result) VALUES ($1, $2, $3)";
  const insVoteVal = [user, ruleNumber, result];

  try {
    await pgQuery.query(insVote, insVoteVal);
    response.status(200).send("Добавлено");
  } catch (error) {
    console.log(error);
    return response.status(400).send({
      error: {
        message: "Ошибка при голосовании за закон",
        code: 499,
      },
    });
  }
});

router.post("/discardUserVote", async (request, response) => {
  const { user, ruleNumber } = request.body;
  const delVote =
    "DELETE FROM public.forseti_voxpopuli WHERE name=$1 AND rule_number=$2";
  const delVoteVal = [user, ruleNumber];

  try {
    await pgQuery.query(delVote, delVoteVal);
    response.status(200).send("Удалено");
  } catch (error) {
    console.log(error);
    return response.status(400).send({
      error: {
        message: "Ошибка при удалении голосования за закон",
        code: 499,
      },
    });
  }
});

router.post("/addSuggestion", async (request, response) => {
  const { text, name } = request.body;
  const insSug =
    "INSERT INTO public.forseti_suggestions (author, text) VALUES ($1, $2)";
  const insSugVal = [name, text];
  try {
    await pgQuery.query(insSug, insSugVal);
    response.status(200).send("Предложение отправлено");
  } catch (error) {
    console.log(error);
    return response.status(400).send({
      error: {
        message: "Ошибка при добавлении предложения",
        code: 499,
      },
    });
  }
});

router.get("/:ruleNumber/:userId", async (request, response) => {
  try {
    const { ruleNumber, userId } = request.params;
    const selectOneRule =
      "SELECT id, title, rule_number, description, initialization_date, rule_link, " +
      "voting_date, visits, populated, voted, author, branch, rejection, yet_voted, " +
      "set_start_period, populi_voted, result_deputy_vote, result_populi_vote, constitutional, last_visit " +
      "FROM public.forseti_rules WHERE rule_number=$1 ORDER BY id ASC";
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

    ///////////////////////////////  ОБНОВЛЕНИЕ КОЛИЧЕСТВА ПРОСМОТРОВ ЗАКОНА  ///////////////////////////////////

    const visits = oneRule[0].visits + 1;
    const lastVisitFromDB = oneRule[0].last_visit;
    const lastVisit = new Date();
    const visitsInterval = lastVisit - lastVisitFromDB;
    if (visitsInterval > 3000) {                  // сервер почему-то дублирует запрос, поэтому ставлю
      const updateVisits =                        // порог обновления количества обращений к закону в 3 секунды
        "UPDATE public.forseti_rules SET visits=$1, last_visit=$2 WHERE rule_number=$3";
      const updateVisitsVal = [visits, lastVisit, oneRuleNumber];
      try {
        await pgQuery.query(updateVisits, updateVisitsVal);
      } catch (error) {
        console.log(error);
      }
    }

    /////////////////////////////////////  СПИСОК КОММЕНТАРИЕВ К ЗАКОНУ  ////////////////////////////////////

    const ruleId = oneRule[0].id;

    const selComments =
      "SELECT * FROM public.forseti_comments WHERE rule_id=$1";
    const selCommentsVal = [ruleId];
    const ruleComments = await pgQuery.query(selComments, selCommentsVal);

    ////////////////////////////////////////////     ДИАГРАММА ГОЛОСОВАНИЯ ДЕПУТАТОВ       /////////////////////////////////////////////
    const selDeputyVote =
      "SELECT COUNT (*) FROM public.forseti_finaltable WHERE rule_number_final=$1 AND vote_result=$2";
    const selDeputyVoteYesVal = [ruleNumber, "За"];
    const deputyVoteYes = await pgQuery.query(
      selDeputyVote,
      selDeputyVoteYesVal
    );

    const selDeputyVoteNoVal = [ruleNumber, "Против"];
    const deputyVoteNo = await pgQuery.query(selDeputyVote, selDeputyVoteNoVal);

    const selDeputyVoteAbstVal = [ruleNumber, "Воздержался"];
    const deputyVoteAbst = await pgQuery.query(
      selDeputyVote,
      selDeputyVoteAbstVal
    );

    const selDeputyNotVoteVal = [ruleNumber, "Не голосовал"];
    const deputyNotVote = await pgQuery.query(
      selDeputyVote,
      selDeputyNotVoteVal
    );

    ///////////////////////////////////////////       ДИАГРАММА ГОЛОСОВАНИЯ НАРОДА      ////////////////////////////////////////////////
    const selPopuliVote =
      "SELECT COUNT (*) FROM public.forseti_voxpopuli WHERE rule_number=$1 AND result=$2";

    const selPopuliVoteYesVal = [ruleNumber, "За"];
    const populiVoteYes = await pgQuery.query(
      selPopuliVote,
      selPopuliVoteYesVal
    );

    const selPopuliVoteNoVal = [ruleNumber, "Против"];
    const populiVoteNo = await pgQuery.query(selPopuliVote, selPopuliVoteNoVal);

    const selPopuliVoteAbstVal = [ruleNumber, "Воздержался"];
    const populiVoteAbst = await pgQuery.query(
      selPopuliVote,
      selPopuliVoteAbstVal
    );

    //////////////////////////////   ГОЛОСОВАНИЕ ПОЛЬЗОВАТЕЛЯ   /////////////////////////////////

    const selUserVote =
      "SELECT result FROM public.forseti_voxpopuli WHERE name=$1";
    const selUserVoteVal = [currentUser];
    let userVote = await pgQuery.query(selUserVote, selUserVoteVal);
    if (userVote.length !== 0) {
      userVote = userVote[0].result;
    } else userVote = "Не голосовал";

    response.status(200).send({
      oneRule: oneRule,
      currUser: currentUser,
      prefer: preferOrNot,
      notPrefer: notPreferOrNot,
      countPrefer: countPrefer[0].count,
      countNotPrefer: countNotPrefer[0].count,
      comments: ruleComments,
      deputyVoteYes: deputyVoteYes[0].count,
      deputyVoteNo: deputyVoteNo[0].count,
      deputyVoteAbst: deputyVoteAbst[0].count,
      deputyNotVote: deputyNotVote[0].count,
      populiVoteYes: populiVoteYes[0].count,
      populiVoteNo: populiVoteNo[0].count,
      populiVoteAbst: populiVoteAbst[0].count,
      userVote: userVote,
    });
  } catch (error) {
    response.send(error);
  }
});

module.exports = router;
