import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeputy, loadDeputyList } from "../store/deputy";
import {
  getMostNotPrefer,
  getMostPrefer,
  getMostVisits,
  getNewRules,
  getNewVoted,
  getRandomRule,
  getRule,
  loadRuleList,
} from "../store/rule";
import { getRegion, loadRegion } from "../store/region";
import SearchRule from "../components/searchRule";
import NavBar from "../components/navBar";
import { useHistory } from "react-router-dom";
import SelectTopQuery from "../components/selectTopQuery";
import TopQuery from "../components/topQuery";
import { getTask, loadTaskList } from "../store/task";
import RandomRule from "../components/randomRule";
import SelectDeputyBlock from "../components/selectDeputyBlock";
import { getIsLoggedIn, getUserName } from "../store/user";
import Footer from "../components/footer";

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [regionDeputiesList, setRegionDeputiesList] = useState();
  const [deputyDisabled, setDeputyDisabled] = useState(true);
  const [searchRule, setSearchRule] = useState("");
  const [searchDeputy, setSearchDeputy] = useState("");
  const rule = useSelector(getRule());
  const deputies = useSelector(getDeputy());
  const region = useSelector(getRegion());
  const task = useSelector(getTask());
  const newRules = useSelector(getNewRules());
  const newVoted = useSelector(getNewVoted());
  const mostVisits = useSelector(getMostVisits());
  const mostPrefer = useSelector(getMostPrefer());
  const mostNotPrefer = useSelector(getMostNotPrefer());
  const randomRule = useSelector(getRandomRule());
  const isLoggedIn = useSelector(getIsLoggedIn());
  const currentUser = useSelector(getUserName());

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
    history.push(`../deputy/${selectedDeputy.name}`, (target = "_blank"));
  };

  const handleSearchRule = ({ target }) => {
    setSearchRule(target.value);
  };

  const handleSearchDeputy = ({ target }) => {
    setSearchDeputy(target.value);
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
    document.body.addEventListener("click", clearInput);
  }, []);

  const clearInput = () => {
    document.querySelector(".input-search-deputy").value = "";
    document.querySelector(".input-search-rule").value = "";
    setSearchDeputy("");
    setSearchRule("");
  };

  let coincidencePieces; // Количество совпадений результатов голосования депутатов и народа
  let totalPopuliVoting; // Законы, по которым народ проголосовал
  let coincidencePr; // Процент совпадений
  if (rule) {
    coincidencePieces = Number(rule.coincidence.coincidencePieces[0].count);
    totalPopuliVoting = Number(rule.coincidence.totalPopuliVoting[0].count);
    coincidencePr = Math.round((coincidencePieces / totalPopuliVoting) * 100);
  }
  const coincidence = { coincidencePieces, totalPopuliVoting, coincidencePr };

  const filteredRules =
    searchRule.length > 4 // Минимальное количество символов в запросе
      ? rule.rulesList.filter(
          // В rule не только список законов, но и количество совпадений результатов голосования
          (rule) =>
            rule.title.toLowerCase().indexOf(searchRule.toLowerCase()) !== -1
        )
      : [];

  const filteredDeputy =
    searchDeputy.length > 2 // Минимальное количество символов в запросе
      ? deputies.filter(
          // В rule не только список законов, но и количество совпадений результатов голосования
          (rule) =>
            rule.name.toLowerCase().indexOf(searchDeputy.toLowerCase()) !== -1
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

        {/*////////////////////////////////////// СЛУЧАЙНЫЙ ЗАКОН /////////////////////////////////////*/}

        <RandomRule randomRule={randomRule} coincidence={coincidence} />

        {/*////////////////////////////////////// ВЫБОР ДЕПУТАТА //////////////////////////////////////*/}

        <SelectDeputyBlock
          handleSelectRegion={handleSelectRegion}
          deputyDisabled={deputyDisabled}
          region={region}
          regionDeputiesList={regionDeputiesList}
          handleSelectDeputy={handleSelectDeputy}
          handleSearchDeputy={handleSearchDeputy}
          hightlight={hightlight}
          filteredDeputy={filteredDeputy}
        />
        
        <Footer />
      </div>
    </>
  );
};

export default Main;
