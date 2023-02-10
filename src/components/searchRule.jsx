import React from "react";
import { Link } from "react-router-dom";

const SearchRule = ({ filteredRules, hightlight, onChange }) => {
  return (
    <>
      <div className="input-group mb-3 row">
        <div className="col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск начнётся после ввода 5 символов"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={onChange}
            // value={searchRule}
          />
        </div>
      </div>
      <div
        className={"collapse row " + (filteredRules.length > 0 ? "show" : "")}
      >
        <div className="col-6">
          <div className="card card-body">
            {filteredRules &&
              filteredRules.map((rule) => {
                hightlight = !hightlight; // Для чередования выделения цветом результатов поиска
                return (
                  <Link key={rule.id} to={`rules/${rule.rule_number}`}>
                    <div
                      className={hightlight ? "hightlight-search-result" : ""}
                      role="button"
                    >
                      {rule.title}
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchRule;
