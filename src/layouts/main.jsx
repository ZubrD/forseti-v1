import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeputy, loadDeputyList } from "../store/deputy";
import { nanoid } from "nanoid";
import { getRule, loadRuleList } from "../store/rule";
import { getRegion, loadRegion } from "../store/region";
import SelectRegion from "../components/selectRegion";
import SelectDeputy from "../components/selectDeputy";
import SearchRule from "../components/searchRule";
import { Link } from "react-router-dom";

const Main = () => {
  const dispatch = useDispatch();
  const [regionDeputiesList, setRegionDeputiesList] = useState();
  const [deputyDisabled, setDeputyDisabled] = useState(true);
  const [searchRule, setSearchRule] = useState("");
  const rule = useSelector(getRule());
  const deputy = useSelector(getDeputy());
  const region = useSelector(getRegion());
  let hightlight = true; // Через useState не получается - бесконечный рендеринг

  const handleSelectRegion = ({ target }) => {
    const selectedRegion = region.find(
      (reg) => reg.id === Number(target.value)
    );
    const regionDeputies = deputy.filter((dep) =>
      dep.region.includes(selectedRegion.name)
    );
    setRegionDeputiesList(regionDeputies);
    setDeputyDisabled(false);
  };

  const handleSearchRule = ({ target }) => {
    setSearchRule(target.value);
  };

  useEffect(() => {
    dispatch(loadDeputyList());
    dispatch(loadRuleList());
    dispatch(loadRegion());
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
      <div className="d-flex flex-row">
        {region && <SelectRegion onChange={handleSelectRegion} />}
        {region && (
          <SelectDeputy
            deputiesList={regionDeputiesList}
            disabledStatus={deputyDisabled}
          />
        )}
      </div>
      <SearchRule
        onChange={handleSearchRule}
        hightlight={hightlight}
        filteredRules={filteredRules}
      />
    </>
  );
};

export default Main;
