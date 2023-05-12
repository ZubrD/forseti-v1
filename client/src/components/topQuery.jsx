import { nanoid } from "nanoid";
import { modifyDateWithoutTime } from "../utils/modifyDateWithoutTime";
import React from "react";

const TopQuery = ({ task, newRules }) => {
  let dateFrom;
  let dateFromString;
  let dateTo;
  let dateToString;
  let countNewRules;
  if (newRules) {
    dateFrom = newRules[0].initialization_date;
    dateFromString = modifyDateWithoutTime(dateFrom);
    dateTo = newRules[newRules.length - 1].initialization_date;
    dateToString = modifyDateWithoutTime(dateTo);
    countNewRules = newRules.length;
  }

  return (
    <div className="row top-query-drops">
      <div id="drop1-new-rule" className="card col" hidden>
        <div className="card-body">
          <h6 className="card-title">
            Новые законопроекты (с {dateFromString} по {dateToString}) -{" "}
            {countNewRules}
          </h6>
          <div className="card-my-scroll">
            <table className="rules-in-table-index">
              <tbody>
                {newRules &&
                  newRules.map((el) => {
                    const modifiedDate = modifyDateWithoutTime(
                      el.initialization_date
                    );
                    return (
                      <tr key={nanoid()}>
                        <td className="new-rule-td">{modifiedDate}</td>
                        <td>
                          <a href={`/rule/${el.rule_number}`} target="_blank">
                            {el.title}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="drop2-new-voted" className="card col" hidden>
        <div className="card-body">
          <h6 className="card-title">Недавно проголосовали (с по ) - </h6>
          <div className="card-my-scroll">
            <table className="rules-in-table-index"></table>
          </div>
        </div>
      </div>
      <div id="drop3-deputy-task" className="card col">
        <div className="card-body">
        <h6 className="card-title">Поручения депутатам</h6>
          <div className="card-my-scroll">
            <table>
              <tbody>
                <tr>
                  <td className="card-text" width="30%">
                    <h6>Адресат</h6>
                  </td>
                  <td className="card-text" width="70%">
                    <h6>Текст поручения</h6>
                  </td>
                  <td className="card-text" width="70%">
                    <h6>Рейтинг</h6>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="rules-in-table-index">
              <tbody>
                {task &&
                  task.map((el) => {
                    return (
                      <tr key={nanoid()}>
                        <td className="card-text" width="30%">
                          {el.deputy_name}
                        </td>
                        <td className="card-text" width="70%">
                          {el.task_text}
                        </td>
                        <td className="card-text" width="70%">
                          {el.task_rating}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="drop4-deputy-answer" className="card col" hidden>
        <div className="card-body">
          <h6 className="card-title">Ответы депутатов</h6>
          <div className="card-my-scroll"></div>
        </div>
      </div>
      <div id="drop5-popular" className="card col" hidden>
        <div className="card-body">
          <h6 className="card-title">Самые популярные законы</h6>
          <div className="card-my-scroll"></div>
        </div>
      </div>
      <div id="drop6-useful" className="card col" hidden>
        <div className="card-body">
          <h6 className="card-title">Самые полезные законы</h6>
          <div className="card-my-scroll"></div>
        </div>
      </div>
      <div id="drop7-needless" className="card col" hidden>
        <div className="card-body">
          <h6 className="card-title">Самые ненужные законы</h6>
          <div className="card-my-scroll"></div>
        </div>
      </div>
    </div>
  );
};

export default TopQuery;
