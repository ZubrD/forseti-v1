import { nanoid } from "nanoid";
import { modifyDateWithoutTime } from "../utils/modifyDateWithoutTime";
import React from "react";

const TopQuery = ({ task, newRules, newVoted, mostVisits, mostPrefer, mostNotPrefer }) => {
  let newRulesDateTo;
  let newRulesDateToString;
  let newRulesDateFrom;
  let newRulesDateFromString;
  let countNewRules;

  let newVotedDateTo;
  let newVotedDateToString;
  let newVotedDateFrom;
  let newVotedDateFromString;
  let countNewVoted;

  if (newRules) {
    newRulesDateTo = newRules[0].initialization_date;
    newRulesDateToString = modifyDateWithoutTime(newRulesDateTo);
    newRulesDateFrom = newRules[newRules.length - 1].initialization_date;
    newRulesDateFromString = modifyDateWithoutTime(newRulesDateFrom);
    countNewRules = newRules.length;
  }

  if (newVoted) {
    newVotedDateTo = newVoted[0].voting_date;
    newVotedDateToString = modifyDateWithoutTime(newVotedDateTo);
    newVotedDateFrom = newVoted[newVoted.length - 1].voting_date;
    newVotedDateFromString = modifyDateWithoutTime(newVotedDateFrom);
    countNewVoted = newVoted.length;
  }

  return (
    <div className="row top-query-drops">
      <div id="drop1-new-rule" className="card col" hidden>
        <div className="card-body">
          <h6 className="card-title">
            Новые законопроекты (с {newRulesDateFromString} по{" "}
            {newRulesDateToString}) - {countNewRules}
          </h6>
          <table>
            <tbody>
              <tr>
                <td className="card-text" width="90%">
                  <h6>Начало работы над законом</h6>
                </td>
                <td className="card-text" width="7%">
                  <h6>Закон</h6>
                </td>
              </tr>
            </tbody>
          </table>
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
          <h6 className="card-title">
            Недавно проголосовали (с {newVotedDateFromString} по{" "}
            {newVotedDateToString}) - {countNewVoted}
          </h6>
          <table>
            <tbody>
              <tr>
                <td className="card-text" width="90%">
                  <h6>Дата голосования</h6>
                </td>
                <td className="card-text" width="7%">
                  <h6>Закон</h6>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="card-my-scroll">
            <table className="rules-in-table-index">
              <tbody>
                {newVoted &&
                  newVoted.map((el) => {
                    const modifiedDate = modifyDateWithoutTime(
                      el.voting_date
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
      <div id="drop3-deputy-task" className="card col">
        <div className="card-body">
          <h6 className="card-title">Поручения депутатам</h6>
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
          <div className="card-my-scroll">
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
      <div id="drop5-popular" className="card col" hidden>
        <div className="card-body">
          <h6 className="card-title">Самые популярные законы</h6>
          <table>
            <tbody>
              <tr>
                <td className="card-text" width="90%">
                  <h6>Закон</h6>
                </td>
                <td className="card-text" width="7%">
                  <h6>Просмотры</h6>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="card-my-scroll">
            <table className="rules-in-table-index">
              <tbody>
                {mostVisits &&
                  mostVisits.map((el) => {
                    return (
                      <tr key={nanoid()}>
                        <td width="90%">
                          <a href={`/rule/${el.rule_number}`} target="_blank">
                            {el.title}
                          </a>
                        </td>
                        <td className="most-visits-td" width="10%">
                          {el.visits}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="drop6-useful" className="card col" hidden>
        <div className="card-body">
          <h6 className="card-title">Самые полезные законы</h6>
          <table>
            <tbody>
              <tr>
                <td className="card-text" width="90%">
                  <h6>Закон</h6>
                </td>
                <td className="card-text" width="5%">
                  <h6>Рейтинг</h6>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="card-my-scroll">
            <table className="rules-in-table-index">
              <tbody>
                {mostPrefer &&
                  mostPrefer.map((el) => {
                    return (
                      <tr key={nanoid()}>
                        <td width="95%">
                          <a href={`/rule/${el.rule_number}`} target="_blank">
                            {el.title}
                          </a>
                        </td>
                        <td className="most-visits-td" width="5%">
                          {el.count}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="drop7-needless" className="card col" hidden>
        <div className="card-body">
          <h6 className="card-title">Самые ненужные законы</h6>
          <table>
            <tbody>
              <tr>
                <td className="card-text" width="90%">
                  <h6>Закон</h6>
                </td>
                <td className="card-text" width="5%">
                  <h6>Рейтинг</h6>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="card-my-scroll">
            <table className="rules-in-table-index">
              <tbody>
                {mostNotPrefer &&
                  mostNotPrefer.map((el) => {
                    return (
                      <tr key={nanoid()}>
                        <td width="95%">
                          <a href={`/rule/${el.rule_number}`} target="_blank">
                            {el.title}
                          </a>
                        </td>
                        <td className="most-visits-td" width="5%">
                          {el.count}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopQuery;
