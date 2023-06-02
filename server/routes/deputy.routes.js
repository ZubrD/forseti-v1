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

router.post("/likeTask", async (request, response) => {
  // Нажатие пальца вверх возле поручения депутату (бледный палец становится ярким)

  // Поиск текущего рейтинга поручения по его id и увеличение его на единицу
  let currentRating;
  const { taskId } = request.body;
  const { currentUser } = request.body;
  try {
    const currentRatingSelect =
      "SELECT task_rating FROM public.forseti_taskfordeputy WHERE id=$1";
    const currentRatingVal = [taskId];
    currentRating = await pgQuery.query(currentRatingSelect, currentRatingVal);
  } catch (error) {
    console.log(
      "Ошибка при получении рейтинга из таблицы taskfordeputy",
      error
    );
  }
  const newRating = currentRating[0].task_rating + 1;

  // Обновление рейтинга в таблице taskfordeputy
  try {
    const setLikeUpdate =
      "UPDATE public.forseti_taskfordeputy SET task_rating=$1 WHERE id=$2 ";
    const setLikeVal = [newRating, taskId];
    await pgQuery.query(setLikeUpdate, setLikeVal);
  } catch (error) {
    console.log(
      "Ошибка при изменении рейтинга в таблице taskfordeputy:",
      error
    );
  }

  // Добавление новой строки в таблице taskrating
  try {
    const newLikeInsert =
      "INSERT INTO public.forseti_tasksrating (task_id, name) VALUES ($1, $2)";
    const newLikeVal = [taskId, currentUser];
    await pgQuery.query(newLikeInsert, newLikeVal);
  } catch (error) {
    console.log(
      "Ошибка при добавлении новой строки рейтинга в таблицу tasksrating",
      error
    );
  }
});

router.post("/withdrawLikeTask", async (request, response) => {
  // Убираю нажатие пальца вверх возле поручения депутату (яркий палец становится бледным)

  // Поиск текущего рейтинга поручения по его id и уменьшение его на единицу
  let currentRating;
  const { taskId } = request.body;
  const { currentUser } = request.body;
  try {
    const currentRatingSelect =
      "SELECT task_rating FROM public.forseti_taskfordeputy WHERE id=$1";
    const currentRatingVal = [taskId];
    currentRating = await pgQuery.query(currentRatingSelect, currentRatingVal);
  } catch (error) {
    console.log(
      "Ошибка при получении рейтинга из таблицы taskfordeputy",
      error
    );
  }
  const newRating = currentRating[0].task_rating - 1;

  // Обновление рейтинга в таблице taskfordeputy
  try {
    const setLikeUpdate =
      "UPDATE public.forseti_taskfordeputy SET task_rating=$1 WHERE id=$2 ";
    const setLikeVal = [newRating, taskId];
    await pgQuery.query(setLikeUpdate, setLikeVal);
  } catch (error) {
    console.log(
      "Ошибка при изменении рейтинга в таблице taskfordeputy:",
      error
    );
  }

  // Удаление строки в таблице taskrating
  try {
    const deleteLikeDelete =
      "DELETE FROM public.forseti_tasksrating WHERE task_id=$1 AND name=$2";
    const deleteLikeVal = [taskId, currentUser];
    await pgQuery.query(deleteLikeDelete, deleteLikeVal);
  } catch (error) {
    console.log(
      "Ошибка при удалении строки рейтинга из таблицы tasksrating",
      error
    );
  }
});

router.get("/:deputyName/:currentUser", async (request, response) => {
  // Получаю текущего пользователя для отображения результатов голосования за поручения депутату
  try {
    const { deputyName } = request.params;
    const { currentUser } = request.params;
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
      "SELECT rule_number, title, author FROM public.forseti_rules";
    const allRules = await pgQuery.query(allRulesSelect);

    //Голосования депутата
    const deputyVoteSelect =
      "SELECT rule_number_final, vote_result FROM public.forseti_finaltable WHERE public.forseti_finaltable.name = $1 ORDER BY rule_number_final ASC";
    const deputyVoteVal = [deputyName];
    const deputyVote = await pgQuery.query(deputyVoteSelect, deputyVoteVal);

    const totalVoteObj = deputyVote.reduce((acum, item) => {
      if (item.vote_result === "За" || item.vote_result === "Против") {
        acum.push(item);
      }
      return acum;
    }, []);
    const totalVote = totalVoteObj.length;

    const deputyNotVoteObj = deputyVote.reduce((acum, item) => {
      if (item.vote_result === "Не голосовал") {
        acum.push(item);
      }
      return acum;
    }, []);
    const deputyNotVote = deputyNotVoteObj.length;

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

    // Автор законов
    const deputyShortNameSelect =
      "SELECT short_name from public.forseti_deputy WHERE name=$1";
    const deputyShortNameVal = [deputyName];
    const deputyShortName = await pgQuery.query(
      deputyShortNameSelect,
      deputyShortNameVal
    );

    const deputyAuthorList = allRules.reduce((acum, item) => {
      if (item.author.indexOf(deputyShortName[0].short_name) !== -1) {
        acum.push(item);
      }
      return acum;
    }, []);

    // Поручения депутату
    const deputyTaskSelect =
      "SELECT * FROM public.forseti_taskfordeputy WHERE deputy_name=$1 ORDER BY id ASC";
    const deputyTaskVal = [deputyName];
    const deputyTasksList = await pgQuery.query(
      deputyTaskSelect,
      deputyTaskVal
    );

    const taskIds = deputyTasksList.reduce((acum, item) => {
      acum.push(item.id);
      return acum;
    }, []);

    const taskRatingSelect = "SELECT * FROM public.forseti_tasksrating";
    const taskRating = await pgQuery.query(taskRatingSelect);

    const usersForDeputyTasksArr = []; // Массив с голосованиями отдельных пользователей по поручениям депутата
    taskIds.forEach((item) => {
      taskRating.forEach((rate) => {
        if (Number(item) === Number(rate.task_id)) {
          usersForDeputyTasksArr.push({
            name: rate.name,
            taskId: rate.task_id,
          });
        }
      });
    });

    const deputyTasksListWithLike = deputyTasksList.map((task) => {
      let newTask = { ...task };
      usersForDeputyTasksArr.forEach((item) => {
        if (item.name === currentUser && item.taskId === task.id) {
          newTask = { ...newTask, currentUserLiked: true };
        }
      });
      return newTask;
    });

    let matching = {
      ratio: ratio,
      yes: matchingRulesYes.length,
      no: matchingRulesNo.length,
      total: matchingRulesYes.length + matchingRulesNo.length, // Сумма совпадений голосований за и против
      totalVote: totalVote, // Общее количество голосов депутата За или Против
      rulesList: matchingRulesList,
    };

    let others = {
      notVote: deputyNotVote,
      author: deputyAuthorList.length,
      authorList: deputyAuthorList,
      deputyTasksList: deputyTasksListWithLike,
    };
    const united = { ...deputy[0], ...mandat[0], matching, others };
    response.status(200).send(united);
  } catch (error) {}
});

router.post("/addTask", async (request, response) => {
  const { text, name, deputyName } = request.body;
  const newTaskRating = 0;
  const newTaskDate =
    String(new Date().getFullYear()) +
    "-" +
    String(new Date().getMonth() + 1) +
    "-" +
    String(new Date().getDate());
  const newTaskInsert =
    "INSERT INTO public.forseti_taskfordeputy (task_author, task_text, task_date, task_rating, deputy_name) VALUES ($1, $2, $3, $4, $5)";
  const newTaskVal = [name, text, newTaskDate, newTaskRating, deputyName];
  try {
    await pgQuery.query(newTaskInsert, newTaskVal); // Добавляю новое поручение в БД
    // Если поручение добавлено, запрашиваю все поручения для данного депутата...
    const deputyTaskSelect =
      "SELECT * FROM public.forseti_taskfordeputy WHERE deputy_name=$1 ORDER BY id ASC";
    const deputyTaskVal = [deputyName];
    const deputyTasksList = await pgQuery.query(
      deputyTaskSelect,
      deputyTaskVal
    );
    // ... и отправляю в deputy.service.js обновлённый список поручений обратно для добавления в store
    response.status(200).send(deputyTasksList); 
  } catch (error) {
    console.log("Ошибка при записи поручения депутату в базу данных", error);
  }
});

module.exports = router;
