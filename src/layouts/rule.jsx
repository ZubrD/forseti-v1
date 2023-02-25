import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneRule, loadOneRule } from "../store/rule";
import { getDeputy } from "../store/deputy";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import NavBar from "../components/navBar";
import { getIsLoggedIn, getUserFromStore } from "../store/user";
import {
  handleClickUnnecessary,
  handleClickNecessary,
} from "../utils/likesDislikes";
import DeputyPieChart from "../components/deputyPieChart";

const Rule = ({ match }) => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserFromStore());
  const ruleNumber = match.params.ruleNumber;
  const ruleAndUserFromStore = useSelector(getOneRule());
  const deputy = useSelector(getDeputy());

  useEffect(() => {
    dispatch(loadOneRule(ruleNumber, userId));
  }, []);

  const isLoggedIn = useSelector(getIsLoggedIn());

  let ruleAuthorArray;
  let deputyShortName;
  let initialisationDate;
  let findedRule;
  let initialisationDateString;
  let workDuration;
  let currentUser;
  let necessity;
  let unNecessity;
  let countPrefer;
  let countNotPrefer;
  let usefulness = 0;
  let usefulnessColor = "";
  let comments;
  let populated;
  let resultDeputyVote;
  let resultPopuliVote;
  let resultDeputyVoteColor;
  let resultPopuliVoteColor;

  if (!ruleAndUserFromStore) {
    // console.log("Загрузка закона...");
  } else {
    // console.log("Загрузка закона завершена");
    // console.log(ruleAndUserFromStore);
    findedRule = ruleAndUserFromStore.oneRule[0]; // Данные о законе
    currentUser = ruleAndUserFromStore.currUser; // Имя пользователя
    necessity = ruleAndUserFromStore.prefer; // Нужность закона для этого пользователя
    unNecessity = ruleAndUserFromStore.notPrefer;
    countPrefer = Number(ruleAndUserFromStore.countPrefer); // Количество лайков за закон (закон нужен)
    countNotPrefer = Number(ruleAndUserFromStore.countNotPrefer); // --- дизлайков (закон не нужен)
    comments = ruleAndUserFromStore.comments;
    populated = ruleAndUserFromStore.oneRule[0].populated; // После занесения в таблицу закона результатов голосования депутатами, отдельно запускается
    // скрипт заполнения таблиы finaltable (Голосования), при этом в таблице Законы для этого закона
    // автоматически ставится отметка в поле Депутаты
    resultDeputyVote = ruleAndUserFromStore.oneRule[0].result_deputy_vote; // Результат голосования депутатов
    resultPopuliVote = ruleAndUserFromStore.oneRule[0].result_populi_vote; // ---       ------      народа
    ruleAuthorArray = findedRule.author.replaceAll(",", "").split(" ");
    deputyShortName = deputy.map((item) => item.short_name); // Депутатская фамилия с инициалами

    initialisationDate = new Date(findedRule.initialization_date);
    const initYear = initialisationDate.getFullYear();
    const initDay = initialisationDate.getDate();
    const monthsArray = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const initMonth = monthsArray[initialisationDate.getMonth()];
    initialisationDateString = initDay + " " + initMonth + " " + initYear;

    workDuration =
      (new Date(findedRule.voting_date) -
        new Date(findedRule.initialization_date)) /
      1000 /
      60 /
      60 /
      24;

    const setLikes = document.querySelector("#set-likes"); // Если пользователь уже проголосовал за бесполезность закона,
    const setDislikes = document.querySelector("#set-dislikes"); // кнопка 'Да' блокируется и наоборот. Разблокировать можно только отменив
    if (setLikes) {
      // предыдущий выбор
      if (unNecessity) setLikes.setAttribute("disabled", "disabled");
    }
    if (setDislikes) {
      if (necessity) setDislikes.setAttribute("disabled", "disabled");
    }

    if (countPrefer !== 0 || countNotPrefer !== 0) {
      usefulness = Math.round(
        (countPrefer / (countPrefer + countNotPrefer)) * 100
      );
      if (usefulness > 50) {
        usefulnessColor = "green";
      }
      if (usefulness < 50) {
        usefulnessColor = "red";
      }
    }

    if (resultDeputyVote === "Отклонён") {
      resultDeputyVoteColor = "gray";
    } else if (resultDeputyVote === "За") {
      resultDeputyVoteColor = "green";
    } else if (resultDeputyVote === "Против") {
      resultDeputyVoteColor = "red";
    }

    if (resultPopuliVote === "Отклонён") {
      resultPopuliVoteColor = "gray";
    } else if (resultPopuliVote === "За") {
      resultPopuliVoteColor = "green";
    } else if (resultPopuliVote === "Против") {
      resultPopuliVoteColor = "red";
    }
  }

  return (
    <>
      <NavBar />
      {findedRule && (
        <div className="container">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
          <div className="row">
            <div className="col offset-9" id="div-visits">
              Количество просмотров: {findedRule.visits}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <h3>{findedRule.rule_number}</h3>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <h4>{findedRule.title}</h4>
            </div>
          </div>
          {/*///////////////////////////// ПОЯСНИТЕЛЬНАЯ ЗАПИСКА ////////////////////////////////////*/}
          <div className="row">
            <MDBAccordion>
              <MDBAccordionItem
                collapseId={1}
                headerTitle="Пояснительная записка"
              >
                {findedRule.description}
              </MDBAccordionItem>
            </MDBAccordion>
          </div>
          {/* //////////////////////////////   АВТОРЫ ЗАКОНА   ////////////////////////////////////// */}
          <div className="row">
            <div className="col">
              <h4>Автор (авторы) законопроекта: </h4>
              {ruleAuthorArray.map((item) => {
                if (deputyShortName.find((short) => short === item)) {
                  // Если что-то из массива авторов совпадает с элементом из массива депутатов,
                  // то нахожу в массиве депутатов его полное имя и использую его для гиперссылки
                  const nameForLink = deputy.find(
                    (dep) => dep.short_name === item
                  );
                  if (nameForLink) {
                    // .. - это переход на уровень выше от текущего
                    return (
                      <Link to={`../deputy/${nameForLink.name}`} key={nanoid()}>
                        {item}{" "}
                      </Link>
                    );
                  }
                } else return <span key={nanoid()}>{item} </span>; // если нет совпадения, то выводится без гиперссылки
              })}
            </div>
          </div>
          {/* //////////////////////////////   ЗАКАЗЧИК ЗАКОНА   ////////////////////////////////////// */}
          <div className="row">
            <div className="col">
              <h4>Заказчик:</h4>
              <p>{findedRule.consumer}</p>
            </div>
          </div>
          {/* //////////////////////////////   РАССМОТРЕНИЕ ЗАКОНА   ////////////////////////////////////// */}
          {!findedRule.populated &&
            !findedRule.rejection && ( // Не проголосовали и не отклонили
              <div className="row">
                <div className="col">
                  <p>
                    Законопроект на рассмотрении с {initialisationDateString}
                  </p>
                </div>
              </div>
            )}
          {findedRule.rejection && (
            <div className="row">
              <div className="col">
                <h4 style={{ color: "red" }}>Законопроект отклонён</h4>
              </div>
            </div>
          )}
          {findedRule.populated && (
            <div className="row">
              <div className="col">
                <h4 style={{ color: "indigo" }}>
                  Законопроект был на рассмотрении {workDuration} дней
                </h4>
              </div>
            </div>
          )}
          {/* //////////////////////// ВАМ ЭТОТ ЗАКОН НУЖЕН? /////////////////////////// */}
          {isLoggedIn && (
            <>
              <div className="row">
                <div className="col div-title" id="div-title-likes">
                  <h3>Этот закон Вам нужен?</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-6" id="div-set-likes">
                  <button
                    id="set-likes"
                    className={"button-" + (necessity ? "liked" : "not-liked")}
                    username={currentUser}
                    rule-number={ruleNumber}
                    liked={necessity ? "liked" : "not-liked"}
                    onClick={handleClickNecessary}
                  >
                    Да
                  </button>
                </div>
                <div className="col-6" id="div-set-dislikes">
                  <button
                    id="set-dislikes"
                    className={
                      "button-" + (unNecessity ? "disliked" : "not-disliked")
                    }
                    rule-number={ruleNumber}
                    disliked={unNecessity ? "disliked" : "not-disliked"}
                    onClick={handleClickUnnecessary}
                  >
                    Нет
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-6" id="div-span-likes">
                  <p id="span-likes">{countPrefer}</p>
                </div>
                <div className="col-6" id="div-span-dislikes">
                  <p id="span-dislikes">{countNotPrefer}</p>
                </div>
              </div>
              {usefulness && (
                <div className="row">
                  <div className="col">
                    <p id="p-usefulness" style={{ color: usefulnessColor }}>
                      Нужность данного закона составляет {usefulness}%
                    </p>
                  </div>
                </div>
              )}
              {/* //////////////////////////////////// ОТПРАВИТЬ КОММЕНТАРИЙ ////////////////////////////// */}
              <div className="row">
                <div className="col">
                  <h4>Ваш комментарий</h4>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <form>
                    <textarea id="comment-textarea" name="text"></textarea>
                    <input
                      type="hidden"
                      name="name"
                      // value="{{ user.username }}"
                    />
                    <br />
                    <button type="submit" className="btn btn-success">
                      Отправить
                    </button>
                  </form>
                </div>
              </div>
              {/* //////////////////////////////////// АККОРДЕОН КОММЕНТАРИЕВ //////////////////////////////////////// */}
              <div className="row">
                <MDBAccordion>
                  <MDBAccordionItem collapseId={1} headerTitle="Комментарии">
                    {comments.map((comment) => (
                      <div key={nanoid()}>
                        <span className="text-bold">{comment.name} </span>
                        <span className="text-italic">от {comment.date1}</span>
                        <p className="text-comment">{comment.text}</p>
                      </div>
                    ))}
                  </MDBAccordionItem>
                </MDBAccordion>
              </div>
              {/* ///////////////////////////////////////  ГОЛОСОВАНИЯ  ////////////////////////////////////////////// */}
              {populated && (
                <>
                  <div className="row">
                    {/* Если прошло голосование и FinalTable заполнена */}
                    <div className="col div-title">
                      <h3>Голосование</h3>
                    </div>
                  </div>
                  <div className="row" id="one_rule_result_deputy">
                    <div className="col-6 div-title">
                      <h4>
                        Депутаты:{" "}
                        <span style={{ color: resultDeputyVoteColor }}>
                          {resultDeputyVote}
                        </span>
                      </h4>
                    </div>
                    <div className="col-6 div-title">
                      <h4>
                        Народ:{" "}
                        <span style={{ color: resultPopuliVoteColor }}>
                          {resultPopuliVote}
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-lg-3 col-simple chart-pos">
                      <DeputyPieChart />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Rule;
