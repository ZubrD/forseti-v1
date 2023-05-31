import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneRule, loadOneRule } from "../store/rule";
import { getDeputy, loadDeputyList } from "../store/deputy";
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
import PopuliPieChart from "../components/populiPieChart";
import PopuliVoteTable from "../components/populiVoteTable";
import VotingForm from "../components/votingForm";
import DeputyVoteTable from "../components/deputyVoteTable";
import Footer from "../components/footer";
import VotingResults from "../components/votingResults";
import RuleNecessity from "../components/ruleNecessity";
import { createComment, getComments, loadCommentsList } from "../store/comment";
import { modifyDate } from "../utils/modifyDate";

const Rule = ({ match }) => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserFromStore());
  const ruleNumber = match.params.ruleNumber;
  const ruleAndUserFromStore = useSelector(getOneRule());
  const deputy = useSelector(getDeputy());
  const comments = useSelector(getComments());
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

  let modifiedComments;
  if (comments) {
    // В массиве комментариев заменяю дату на удобоваримую
    modifiedComments = comments.map((item) => {
      return {
        id: item.id,
        name: item.name,
        text: item.text,
        rule_id: item.rule_id,
        date1: modifyDate(item.date1),
      };
    });
  }

  const [newComment, setNewComment] = useState({
    text: "",
    name: "",
    date1: "",
    rule_id: "",
  });

  useEffect(() => {
    dispatch(loadDeputyList());
    dispatch(loadOneRule(ruleNumber, userId));
    dispatch(loadCommentsList(ruleNumber, userId));
  }, []);

  const handleChangeComment = (event) => {
    const commentText = event.target.value;
    const commentAuthor = event.target.attributes["author"].value; // запрос к значению атрибут можно сделать и так
    const commentRuleId = event.target.getAttribute("rule-id"); // и так
    setNewComment((prevState) => ({
      ...prevState,
      text: commentText,
      name: commentAuthor,
      rule_id: commentRuleId,
      date1: Date.now(),
    }));
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    const commentTextarea = document.getElementById("comment-textarea");
    dispatch(createComment(newComment));
    commentTextarea.value = "";
  };

  const isLoggedIn = useSelector(getIsLoggedIn());

  let ruleAuthorArray;
  let deputyShortName;
  let initialisationDate;
  let findedRule;
  let ruleId;
  let initialisationDateString;
  let workDuration;
  let currentUser;
  let necessity;
  let unNecessity;
  let countPrefer;
  let countNotPrefer;
  let usefulness = 0;
  let usefulnessColor = "";
  let populated;
  let resultDeputyVote;
  let resultPopuliVote;
  let resultDeputyVoteColor;
  let resultPopuliVoteColor;
  let deputyVoteYes;
  let deputyVoteNo;
  let deputyVoteAbstained;
  let deputyNotVote;
  let deputyVoteTotal;
  let deputyVoteYesPr;
  let deputyVoteNoPr;
  let deputyVoteAbstainedPr;
  let deputyNotVotePr;
  let populiVoteYes;
  let populiVoteNo;
  let populiVoteAbstained;
  let populiVoteTotal;
  let populiVoteYesPr;
  let populiVoteNoPr;
  let populiVoteAbstainedPr;
  let userVote;
  let rejection;

  if (!ruleAndUserFromStore) {
    // console.log("Загрузка закона...");
  } else {
    // console.log("Загрузка закона завершена");
    // console.log(ruleAndUserFromStore);
    findedRule = ruleAndUserFromStore.oneRule[0]; // Данные о законе
    ruleId = ruleAndUserFromStore.oneRule[0].id; // Данные о законопроекта
    currentUser = ruleAndUserFromStore.currUser; // Имя пользователя
    necessity = ruleAndUserFromStore.prefer; // Нужность закона для этого пользователя
    unNecessity = ruleAndUserFromStore.notPrefer;
    countPrefer = Number(ruleAndUserFromStore.countPrefer); // Количество лайков за закон (закон нужен)
    countNotPrefer = Number(ruleAndUserFromStore.countNotPrefer); // --- дизлайков (закон не нужен)
    populated = ruleAndUserFromStore.oneRule[0].populated; // После занесения в таблицу закона результатов голосования депутатами, отдельно запускается
    // скрипт заполнения таблиы finaltable (Голосования), при этом в таблице Законы для этого закона
    // автоматически ставится отметка в поле Депутаты
    resultDeputyVote = ruleAndUserFromStore.oneRule[0].result_deputy_vote; // Результат голосования депутатов
    resultPopuliVote = ruleAndUserFromStore.oneRule[0].result_populi_vote; // ---       ------      народа

    deputyVoteYes = Number(ruleAndUserFromStore.deputyVoteYes); //Количество голосов депутатов "За" при голосовании за закон
    deputyVoteNo = Number(ruleAndUserFromStore.deputyVoteNo);
    deputyVoteAbstained = Number(ruleAndUserFromStore.deputyVoteAbst);
    deputyNotVote = Number(ruleAndUserFromStore.deputyNotVote);

    deputyVoteTotal =
      deputyVoteYes + deputyVoteNo + deputyVoteAbstained + deputyNotVote;
    if (deputyVoteTotal) {
      deputyVoteYesPr =
        Math.round((deputyVoteYes / deputyVoteTotal) * 100 * 10) / 10; // Округление до одного знака: *10 и /10
      deputyVoteNoPr =
        Math.round((deputyVoteNo / deputyVoteTotal) * 100 * 10) / 10;
      deputyVoteAbstainedPr =
        Math.round((deputyVoteAbstained / deputyVoteTotal) * 100 * 10) / 10;
      deputyNotVotePr =
        Math.round((deputyNotVote / deputyVoteTotal) * 100 * 10) / 10;
    }

    populiVoteYes = Number(ruleAndUserFromStore.populiVoteYes); //Количество голосов народв "За" при голосовании за закон
    populiVoteNo = Number(ruleAndUserFromStore.populiVoteNo);
    populiVoteAbstained = Number(ruleAndUserFromStore.populiVoteAbst);

    populiVoteTotal = populiVoteYes + populiVoteNo + populiVoteAbstained;
    if (populiVoteTotal) {
      populiVoteYesPr =
        Math.round((populiVoteYes / populiVoteTotal) * 100 * 10) / 10; // Округление до одного знака: *10 и /10
      populiVoteNoPr =
        Math.round((populiVoteNo / populiVoteTotal) * 100 * 10) / 10;
      populiVoteAbstainedPr =
        Math.round((populiVoteAbstained / populiVoteTotal) * 100 * 10) / 10;
    }

    userVote = ruleAndUserFromStore.userVote;
    rejection = ruleAndUserFromStore.oneRule[0].rejection;

    ruleAuthorArray = findedRule.author.replaceAll(",", "").split(" ");
    deputyShortName = deputy.map((item) => item.short_name); // Депутатская фамилия с инициалами

    initialisationDate = new Date(findedRule.initialization_date);
    const initYear = initialisationDate.getFullYear();
    const initDay = initialisationDate.getDate();

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
      if (usefulness > 49) {
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
          {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script> */}
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
          <RuleNecessity
            isLoggedIn={isLoggedIn}
            necessity={necessity}
            currentUser={currentUser}
            ruleNumber={ruleNumber}
            onClickNecessary={handleClickNecessary}
            unNecessity={unNecessity}
            onClickUnnecessary={handleClickUnnecessary}
            countPrefer={countPrefer}
            countNotPrefer={countNotPrefer}
            usefulness={usefulness}
            usefulnessColor={usefulnessColor}
          />
          {/* //////////////////////////////////// ОТПРАВИТЬ КОММЕНТАРИЙ ////////////////////////////// */}
          {isLoggedIn && (
            <>
              <div className="row">
                <div className="col">
                  <h4>Ваш комментарий</h4>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <form onSubmit={handleSubmitComment}>
                    <textarea
                      id="comment-textarea"
                      name="comm"
                      author={currentUser} /* через dataset не работает */
                      rule-id={ruleId}
                      onChange={handleChangeComment}
                    ></textarea>
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
            </>
          )}
          <>
            {/* //////////////////////////////////// АККОРДЕОН КОММЕНТАРИЕВ //////////////////////////////////////// */}
            {modifiedComments && (
              <div className="row">
                <MDBAccordion>
                  <MDBAccordionItem collapseId={1} headerTitle="Комментарии">
                    {modifiedComments.map((comment) => (
                      <div key={nanoid()}>
                        <span className="text-bold">{comment.name} </span>
                        <span className="text-italic">от {comment.date1}</span>
                        <p className="text-comment">{comment.text}</p>
                      </div>
                    ))}
                  </MDBAccordionItem>
                </MDBAccordion>
              </div>
            )}

            {/* ///////////////////////////////////////  ГОЛОСОВАНИЯ  ////////////////////////////////////////////// */}
            {populated && (
              <>
                {/* ////////////////////////////////   РЕЗУЛЬТАТЫ ГОЛОСОВАНИЯ   ////////////////////////////////// */}
                <VotingResults
                  resultDeputyVoteColor={resultDeputyVoteColor}
                  resultDeputyVote={resultDeputyVote}
                  resultPopuliVoteColor={resultPopuliVoteColor}
                  resultPopuliVote={resultPopuliVote}
                />
                {/* ////////////////////////   ДИАГРАММА ГОЛОСОВАНИЯ ДЕПУТАТОВ    //////////////////////////////// */}
                <div className="row">
                  {deputyVoteTotal && (
                    <>
                      <DeputyPieChart
                        deputyVoteYes={deputyVoteYes}
                        deputyVoteNo={deputyVoteNo}
                        deputyVoteAbstained={deputyVoteAbstained}
                        deputyNotVote={deputyNotVote}
                      />
                      {/* ////////////////////////////    ТАБЛИЦА РЕЗУЛЬТАТОВ ГОЛОСОВАНИЯ ДЕПУТАТОВ     ///////////////////////////// */}
                      <DeputyVoteTable
                        deputyVoteYes={deputyVoteYes}
                        deputyVoteYesPr={deputyVoteYesPr}
                        deputyVoteNo={deputyVoteNo}
                        deputyVoteNoPr={deputyVoteNoPr}
                        deputyVoteAbstained={deputyVoteAbstained}
                        deputyVoteAbstainedPr={deputyVoteAbstainedPr}
                        deputyNotVote={deputyNotVote}
                        deputyNotVotePr={deputyNotVotePr}
                      />
                    </>
                  )}

                  {populiVoteTotal && (
                    <>
                      {/* ////////////////////////////////    ДИАГРАММА ГОЛОСОВАНИЯ НАРОДА    //////////////////////////////////// */}
                      <PopuliPieChart
                        populiVoteYes={populiVoteYes}
                        populiVoteNo={populiVoteNo}
                        populiVoteAbstained={populiVoteAbstained}
                      />
                      {/* ////////////////////////////    ТАБЛИЦА РЕЗУЛЬТАТОВ ГОЛОСОВАНИЯ НАРОДА     ///////////////////////////// */}
                      <PopuliVoteTable
                        populiVoteYes={populiVoteYes}
                        populiVoteYesPr={populiVoteYesPr}
                        populiVoteNo={populiVoteNo}
                        populiVoteNoPr={populiVoteNoPr}
                        populiVoteAbstained={populiVoteAbstained}
                        populiVoteAbstainedPr={populiVoteAbstainedPr}
                      />
                    </>
                  )}
                </div>
                {/* ///////////////////////////////////////   ФОРМА ГОЛОСОВАНИЯ   //////////////////////////////////////// */}

                {isLoggedIn && deputyVoteTotal && (
                  <VotingForm
                    userVote={userVote}
                    currentUser={currentUser}
                    ruleNumber={ruleNumber}
                  />
                )}
                {!deputyVoteTotal && rejection && (
                  <div className="row">
                    <div className="col div-title">
                      <h3>Данный закон отклонён</h3>
                    </div>
                  </div>
                )}
                {!deputyVoteTotal && !rejection && (
                  <div className="row">
                    <div className="col div-title">
                      <h3>По этому закону ещё не проводилось голосование</h3>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Rule;
