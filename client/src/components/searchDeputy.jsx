import React from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const SearchDeputy = ({ filteredDeputy, hightlight, onChange }) => {
  return (
    <>
      <div className="input-group mb-3 row">
        <div className="col-6 div-search-deputy">
          <input
            type="text"
            className="form-control input-search-deputy "
            placeholder="Поиск депутата"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={onChange}
          />
        </div>
        <div
          className={"no-border collapse " + (filteredDeputy.length > 0 ? "show" : "")}
        >
          <div className="position-relative row">
            <div className="col-4 position-absolute top-0 start-0 search-deputy-result">
              {filteredDeputy &&
                filteredDeputy.map((deputy) => {
                  hightlight = !hightlight; // Для чередования выделения цветом результатов поиска
                  return (
                    <Link
                      key={nanoid()}
                      to={`deputy/${deputy.name}`}
                      target="_blank"
                    >
                      <div
                        className={hightlight ? "hightlight-search-result" : ""}
                        role="button"
                      >
                        {deputy.name}
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchDeputy;
