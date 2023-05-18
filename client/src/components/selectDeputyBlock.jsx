import React from "react";
import SelectRegion from "./selectRegion";
import SelectDeputy from "./selectDeputy";
import SearchDeputy from "./searchDeputy";

const SelectDeputyBlock = ({
  handleSelectRegion,
  deputyDisabled,
  region,
  regionDeputiesList,
  handleSelectDeputy,
  handleSearchDeputy,
  hightlight,
  filteredDeputy,
}) => {
  return (
    <>
      <div className="row">
        <div className="col col-12 col-title">
          <p className="p-title">Поиск депутата</p>
        </div>
      </div>
      <div className="row">
        <div>
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
          <SearchDeputy
            onChange={handleSearchDeputy}
            hightlight={hightlight}
            filteredDeputy={filteredDeputy}
          />
        </div>
      </div>
    </>
  );
};

export default SelectDeputyBlock;
