import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseLikeTask,
  getOneDeputy,
  increaseLikeTask,
  loadOneDeputy,
  minusLikeForStore,
  plusLikeForStore,
} from "../store/deputy";
import NavBar from "../components/navBar";
import { modifyDateWithoutTime } from "../utils/modifyDateWithoutTime";
import Footer from "../components/footer";
import TaskForDeputy from "../components/taskForDeputy";
import { getUserName } from "../store/user";

const Deputy = ({ match }) => {
  const dispatch = useDispatch();
  const deputyName = match.params.deputyName;
  const deputy = useSelector(getOneDeputy()); // Данные из магазина или склада, короче, из store )
  const currentUser = useSelector(getUserName());

  let hightlight = true;

  useEffect(() => {
    dispatch(loadOneDeputy(deputyName, currentUser)); // Загрузка данных с сервера в store
  }, []);

  let birthDate;
  if (deputy) {
    birthDate = modifyDateWithoutTime(deputy.birth);
  }

  const handleClick = (event) => {
    // Обработка клика на одобрение задания для депутата
    const element = event.target;
    const taskId = element.getAttribute("data-task-id");
    const likeData = { taskId: taskId, currentUser: currentUser };
    if (element.classList.contains("task-img-clicked")) {
      element.classList.remove("task-img-clicked");
      dispatch(decreaseLikeTask(likeData)); // Отправка запроса на сервер
      dispatch(minusLikeForStore(taskId)); // Запрос в store
    } else {
      element.classList.add("task-img-clicked");
      dispatch(increaseLikeTask(likeData));
      dispatch(plusLikeForStore(taskId));
    }
  };

  return (
    <>
      <NavBar />
      {deputy && (
        <div className="container">
          <div className="row">
            <div className="col">
              <h4 className="tit">
                {deputy.name}, {birthDate}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <img src={require(`../media/${deputy.image}`)}></img>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h5>
                {deputy.party_fraction}, {deputy.basis}{" "}
                {deputy.electoral_district}
              </h5>
              <h6>{deputy.region}</h6>
            </div>
          </div>
          {/*///////////////////////////// СОВПАДЕНИЕ С МНЕНИЕМ НАРОДА ////////////////////////////////////*/}
          <div className="row">
            <MDBAccordion>
              <MDBAccordionItem
                collapseId={1}
                headerTitle={`Совпадение с мнением народа ${deputy.matching.ratio}% (${deputy.matching.total} законов. 
                  Из них За - ${deputy.matching.yes}, Против - ${deputy.matching.no}). Всего было принято участие в ${deputy.matching.totalVote} голосованиях`}
              >
                {deputy.matching.rulesList.map((rule) => {
                  hightlight = !hightlight; // Для чередования выделения цветом результатов поиска
                  return (
                    <Link
                      key={nanoid()}
                      to={`../rule/${rule.rule_number}`}
                      target="_blank"
                    >
                      <div
                        className={hightlight ? "hightlight-search-result" : ""}
                        role="button"
                      >
                        {rule.title}
                      </div>
                    </Link>
                  );
                })}
              </MDBAccordionItem>
            </MDBAccordion>
          </div>
          <div className="row">
            <div className="col">
              <p>Прогул {deputy.others.notVote} голосований</p>
            </div>
          </div>
          <div className="row">
            <MDBAccordion>
              <MDBAccordionItem
                collapseId={1}
                headerTitle={`Инициатор ${deputy.others.author} законопроектов`}
              >
                {deputy.others.authorList.map((rule) => {
                  hightlight = !hightlight; // Для чередования выделения цветом результатов поиска
                  return (
                    <Link
                      key={nanoid()}
                      to={`../rule/${rule.rule_number}`}
                      target="_blank"
                    >
                      <div
                        className={hightlight ? "hightlight-search-result" : ""}
                        role="button"
                      >
                        {rule.title}
                      </div>
                    </Link>
                  );
                })}
              </MDBAccordionItem>
            </MDBAccordion>
          </div>
          <TaskForDeputy onClick={handleClick} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Deputy;
