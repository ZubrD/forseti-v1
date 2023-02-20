import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneRule, loadOneRule } from "../store/rule";
import { getDeputy } from "../store/deputy";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import NavBar from "../components/navBar";
import { getIsLoggedIn, getUserFromStore } from "../store/user";

const Rule = ({ match }) => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserFromStore())
  const ruleNumber = match.params.ruleNumber;
  const ruleFromStore = useSelector(getOneRule());
  const deputy = useSelector(getDeputy());

  useEffect(() => {
    dispatch(loadOneRule(ruleNumber));
  }, []);

  const isLoggedIn = useSelector(getIsLoggedIn());

  let ruleAuthorArray;
  let deputyShortName;
  let initialisationDate;
  let findedRule;
  let initialisationDateString;
  let workDuration;
  if (!ruleFromStore) {
    // console.log("Загрузка закона...");
  } else {
    // console.log("Загрузка закона завершена");
    findedRule = ruleFromStore[0];
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
                    className="button-{{ liked_or_not }}"
                    // username="{{ user.username }}"
                    userId={userId}
                    rule-number={ruleNumber}
                    liked="{{ liked_or_not }}"
                  >
                    Да
                  </button>
                </div>
                <div className="col-6" id="div-set-dislikes">
                  <button
                    id="set-dislikes"
                    className="button-{{ disliked_or_not }}"
                    userId={userId}
                    rule-number={ruleNumber}
                    disliked="{{ disliked_or_not }}"
                  >
                    Нет
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Rule;
