import React from "react";
import { useSelector } from "react-redux";
import { getRegion } from "../store/region";

const SelectRegion = ({ onChange }) => {
  const region = useSelector(getRegion());


  return (
    <div className="col-md-3 me-2 mb-4 mt-4">
      <label htmlFor="validationCustom04" className="form-label">
        Регионы
      </label>
      <select
        defaultValue=""
        className="form-select"
        id="validationCustom04"
        required
        onChange={onChange}
      >
        <option disabled value="">
          Выберите регион...
        </option>
        {region.map((reg) => {
          return (
            <option key={reg.id} value={reg.id}>
              {reg.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectRegion;
