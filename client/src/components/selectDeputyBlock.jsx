import React from "react";
import SelectRegion from "./selectRegion";
import SelectDeputy from "./selectDeputy";

const SelectDeputyBlock = ({
  handleSelectRegion,
  deputyDisabled,
  region,
  regionDeputiesList,
  handleSelectDeputy,
}) => {
  return (
    <>
      <div className="row">
        <div className="col col-12 col-title">
          <p className="p-title">Поиск депутата</p>
        </div>
      </div>
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
    </>
  );
};

export default SelectDeputyBlock;
