import { nanoid } from "nanoid";
import React from "react";

const selectArray = [
  {title: "Поручения депутатам", id: "drop3-deputy-task"},
  {title: "Новые законопроекты", id: "drop1-new-rule"},
  {title: "Недавно проголосовали", id: "drop2-new-voted"},
  {title: "Самые популярные законы", id: "drop5-popular"},
  {title: "Самые полезные законы", id: "drop6-useful"},
  {title: "Самые ненужные законы", id: "drop7-needless"},
];

const SelectTopQuery = ({ onChange }) => {
  return (
    <div className="col-md-12 me-2 mb-4 mt-4 top-select">
      <select
        defaultValue=""
        className="form-select main-top-select"
        id="validationCustom09"
        required
        onChange={onChange}
      >
        {selectArray.map((el) => {
          return <option key={nanoid()} value={el.id} >{el.title}</option>;
        })}
      </select>
    </div>
  );
};

export default SelectTopQuery;
