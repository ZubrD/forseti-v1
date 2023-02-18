import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneRule, loadOneRule } from "../store/rule";
import { getDeputy } from "../store/deputy";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const Rule = ({ match }) => {

  const dispatch = useDispatch();
  const ruleNumber = match.params.ruleNumber;
  const ruleFromStore = useSelector(getOneRule());
  const deputy = useSelector(getDeputy());

  useEffect(() => {
    dispatch(loadOneRule(ruleNumber));
  }, []);

  let ruleAuthorArray
  let deputyShortName
  let initialisationDate
  let findedRule
  if (!ruleFromStore) {
    console.log("Загрузка закона...");
  } else {
    console.log("Загрузка закона завершена");
    findedRule = ruleFromStore[0]
    ruleAuthorArray = findedRule.author.replaceAll(",", "").split(" ");
    deputyShortName = deputy.map((item) => item.short_name); // Депутатская фамилия с инициалами
    initialisationDate = new Date(findedRule.initialization_date);
  }

  return (
    <>
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
                    return (
                      <Link to={`deputy/${nameForLink.name}`} key={nanoid()}>
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
                    Законопроект на рассмотрении с{" "}
                    {findedRule.initialization_date}
                  </p>
                </div>
              </div>
            )}
        </div>
      )}
    </>
  );
};

export default Rule;
