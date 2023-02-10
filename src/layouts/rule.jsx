import React from "react";
import { useSelector } from "react-redux";
import { getRule } from "../store/rule";
import { getDeputy } from "../store/deputy";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Rule = ({ match }) => {
  const rules = useSelector(getRule());
  const deputy = useSelector(getDeputy());
  const ruleNumber = match.params.ruleNumber;
  let findedRule;
  if (rules) {
    findedRule = rules.find((item) => ruleNumber === String(item.rule_number));
  } else {
    findedRule = null;
  }

  const ruleAuthorArray = findedRule.author.replaceAll(",", "").split(" ");
  const deputyShortName = deputy.map((item) => item.short_name); // Депутатская фамилия с инициалами
  const initialisationDate = new Date(findedRule.initialization_date);
  console.log(initialisationDate.getFullYear());

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
                      <Link to={`deputy/${nameForLink.name}`}>{item} </Link>
                    );
                  }
                } else return <span>{item} </span>; // если нет совпадения, то выводится без гиперссылки
              })}
            </div>
          </div>
          {/* //////////////////////////////   ЗАКАЗЧИК ЗАКОНА   ////////////////////////////////////// */}
          <div class="row">
            <div class="col">
              <h4>Заказчик:</h4>
              <p>{findedRule.consumer}</p>
            </div>
          </div>
          {/* //////////////////////////////   РАССМОТРЕНИЕ ЗАКОНА   ////////////////////////////////////// */}
          {!findedRule.populated && !findedRule.rejection && (  // Не проголосовали и не отклонили
            <div class="row">
              <div class="col">
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
  // return <>{rules && <h1>Закон {finded.title}</h1>}</>;
};

export default Rule;
