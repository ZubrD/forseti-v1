const express = require("express");
const pgQuery = require("postgresql-query");
const connection = require("../config/default.json");

pgQuery.config(connection.connectViaPgQueries); // Соединение с базой через postgresql-query
const router = express.Router({ mergeParams: true });

router.get("/deputies-total-list", async (request, response) => {
  const selectDeputies = "SELECT * FROM public.forseti_deputy ORDER BY id ASC";
  const deputiesList = await pgQuery.query(selectDeputies);
  response.status(200).send(deputiesList);
});

router.get("/:deputyName", async (request, response) => {
  try {
    const { deputyName } = request.params;
    const selectDeputy = "SELECT * FROM public.forseti_deputy WHERE name=$1";
    const selectDeputyVal = [deputyName];
    const deputy = await pgQuery.query(selectDeputy, selectDeputyVal);

    const selectMandat =
      "SELECT public.forseti_mandatbasis.basis FROM public.forseti_mandatbasis,  public.forseti_deputy WHERE public.forseti_mandatbasis.id = public.forseti_deputy.mandat_basis_id AND public.forseti_deputy.name = $1";
    const selectMandatVal = [deputyName];
    const mandat = await pgQuery.query(selectMandat, selectMandatVal);

    // ПОДСЧЁТ СОПАДЕНИЙ РЕЗУЛЬТАТОВ ГОЛОСОВАНИЯ ДЕПУТАТА И НАРОДА

    // Все законы (для вывода списка законов с совпадающими результатами голосования депутата и народа)

    const allRulesSelect =
      "SELECT rule_number, title FROM public.forseti_rules";
    const allRules = await pgQuery.query(allRulesSelect); 

    //Голосования депутата "За и Против"
    const deputyVoteSelect =
      "SELECT rule_number_final, vote_result FROM public.forseti_finaltable WHERE public.forseti_finaltable.name = $1 AND (public.forseti_finaltable.vote_result = 'За' OR public.forseti_finaltable.vote_result = 'Против') ORDER BY rule_number_final ASC";
    const deputyVoteVal = [deputyName];
    const deputyVote = await pgQuery.query(deputyVoteSelect, deputyVoteVal);
    const totalVote = deputyVote.length;

    // Голосования народа За и Против
    const populiVoteSelect =
      "SELECT rule_number, result_populi_vote FROM public.forseti_rules WHERE result_populi_vote='За' OR result_populi_vote='Против' ORDER BY rule_number ASC";
    const populiVote = await pgQuery.query(populiVoteSelect);

    // Массив законов с совпадающими результатами
    const matchingRules = deputyVote.reduce((acum, dep) => {
      // Reduce можно заменить на forEach, для этого acum выносится во внешнюю переменную
      populiVote.forEach((pop) => {
        if (
          dep.vote_result === pop.result_populi_vote &&
          dep.rule_number_final === pop.rule_number
        ) {
          acum.push(dep);
        }
      });
      return acum;
    }, []);

    const matchingRulesNo = matchingRules.filter(
      (item) => item.vote_result === "Против"
    );

    const matchingRulesYes = matchingRules.filter(
      (item) => item.vote_result === "За"
    );

    const ratio =
      Math.round((matchingRules.length / totalVote) * 100 * 10) / 10;

    const matchingRulesList = allRules.reduce((acum, rule) => {
      matchingRules.forEach((item) => {
        if (rule.rule_number === item.rule_number_final) {
          acum.push(rule);
        }
      });
      return acum;
    }, []);

    let matching = {
      ratio: ratio,
      yes: matchingRulesYes.length,
      no: matchingRulesNo.length,
      total: matchingRulesYes.length + matchingRulesNo.length, // Сумма совпадений голосований за и против
      totalVote: totalVote, // Общее количество голосов депутата За или Против
      rulesList: matchingRulesList,
    };
    const united = { ...deputy[0], ...mandat[0], matching };
    response.status(200).send(united);
  } catch (error) {}
});

module.exports = router;
