import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeputy, loadDeputyList } from "../store/deputy";
import {
  getMostNotPrefer,
  getMostPrefer,
  getMostVisits,
  getNewRules,
  getNewVoted,
  getRule,
  loadRuleList,
} from "../store/rule";
import { getRegion, loadRegion } from "../store/region";
import SelectRegion from "../components/selectRegion";
import SelectDeputy from "../components/selectDeputy";
import SearchRule from "../components/searchRule";
import NavBar from "../components/navBar";
import { useHistory } from "react-router-dom";
import SelectTopQuery from "../components/selectTopQuery";
import TopQuery from "../components/topQuery";
import { getTask, loadTaskList } from "../store/task";

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [regionDeputiesList, setRegionDeputiesList] = useState();
  const [deputyDisabled, setDeputyDisabled] = useState(true);
  const [searchRule, setSearchRule] = useState("");
  const rule = useSelector(getRule());
  const deputies = useSelector(getDeputy());
  const region = useSelector(getRegion());
  const task = useSelector(getTask());
  const newRules = useSelector(getNewRules());
  const newVoted = useSelector(getNewVoted());
  const mostVisits = useSelector(getMostVisits());
  const mostPrefer = useSelector(getMostPrefer());
  const mostNotPrefer = useSelector(getMostNotPrefer());
  let hightlight = true; // Через useState не получается - бесконечный рендеринг

  const handleSelectRegion = ({ target }) => {
    const selectedRegion = region.find(
      (reg) => reg.id === Number(target.value)
    );
    const regionDeputies = deputies.filter((dep) =>
      dep.region.includes(selectedRegion.name)
    );
    setRegionDeputiesList(regionDeputies);
    setDeputyDisabled(false);
  };

  const handleSelectDeputy = ({ target }) => {
    console.log(target.value);
    const selectedDeputy = deputies.find(
      (item) => item.id === Number(target.value)
    );
    console.log(selectedDeputy.name);
    history.push(`../deputy/${selectedDeputy.name}`);
  };

  const handleSearchRule = ({ target }) => {
    setSearchRule(target.value);
  };

  const handleChangeTopQuery = ({ target }) => {
    const elementsToHide = document.querySelector(".top-query-drops");
    for (let i = 0; i < elementsToHide.childNodes.length; i++) {
      if (elementsToHide.childNodes[i].id === target.value) {
        elementsToHide.childNodes[i].removeAttribute("hidden");
      } else {
        elementsToHide.childNodes[i].setAttribute("hidden", true);
      }
    }
  };

  useEffect(() => {
    dispatch(loadDeputyList());
    dispatch(loadRuleList());
    dispatch(loadRegion());
    dispatch(loadTaskList());
  }, []);

  const filteredRules =
    searchRule.length > 4 // Минимальное количество символов в запросе
      ? rule.filter(
          (rule) =>
            rule.title.toLowerCase().indexOf(searchRule.toLowerCase()) !== -1
        )
      : [];

  return (
    <>
      <NavBar />
      <div className="container">
        {/* ////////////////////////////////  ПОИСК ЗАКОНА  ///////////////////////////////////////// */}
        <SearchRule
          onChange={handleSearchRule}
          hightlight={hightlight}
          filteredRules={filteredRules}
        />

        {/*///////////////////////////////////  ЗАГОЛОВОК "МОНИТОР"  /////////////////////////////////*/}

        <div className="row">
          <div className="col top-title">
            <p>Монитор</p>
          </div>
        </div>

        {/*///////////////////////// ВЫПАДАЮЩИЙ СПИСОК ПОД ЗАГОЛОВОКОМ МОНИТОР ///////////////////////*/}

        <SelectTopQuery onChange={handleChangeTopQuery} />
        <TopQuery
          task={task}
          newRules={newRules}
          newVoted={newVoted}
          mostVisits={mostVisits}
          mostPrefer={mostPrefer}
          mostNotPrefer={mostNotPrefer}
        />

        <div className="d-flex flex-row">
          {region && <SelectRegion onChange={handleSelectRegion} />}
          {region && (
            <SelectDeputy
              deputiesList={regionDeputiesList}
              disabledStatus={deputyDisabled}
              onChange={handleSelectDeputy}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
