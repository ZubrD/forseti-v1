import React from "react";

const SelectDeputy = ({ deputiesList, disabledStatus, onChange }) => {
  return (
    <div className="col-md-3 mb-4 mt-4">
      <label htmlFor="validationCustom05" className="form-label">
        Депутаты
      </label>
      <select
        defaultValue=""
        className="form-select"
        id="validationCustom05"
        required
        disabled={disabledStatus}
        onChange={onChange}
      >
        <option disabled value="">
          Выберите депутата...
        </option>
        {deputiesList &&
          deputiesList.map((dep) => {
            return (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default SelectDeputy;
