import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getOneDeputy, loadOneDeputy } from "../store/deputy";
import NavBar from "../components/navBar";
import { modifyDateWithoutTime } from "../utils/modifyDateWithoutTime";

const Deputy = ({ match }) => {
  const dispatch = useDispatch();
  const deputyName = match.params.deputyName;
  const deputy = useSelector(getOneDeputy()); // Данные из магазина или склада, короче, из store )

  let hightlight = true;

  useEffect(() => {
    dispatch(loadOneDeputy(deputyName));
  }, []);

  let birthDate;
  if (deputy) {
    birthDate = modifyDateWithoutTime(deputy.birth);
  }

  return (
    <>
      <NavBar />
      {deputy && (
        <div className="container">
          <div className="row">
            <div className="col">
              <h4>
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
          {/*///////////////////////////// ПОЯСНИТЕЛЬНАЯ ЗАПИСКА ////////////////////////////////////*/}
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
        </div>
      )}
    </>
  );
};

export default Deputy;
