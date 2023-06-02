import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSuggestion } from "../store/rule";
import { getIsLoggedIn, getUserName } from "../store/user";

const Footer = () => {
  const dispatch = useDispatch();
  const [suggestion, setSuggestion] = useState();
  const currentUser = useSelector(getUserName())
  const isLoggedIn = useSelector(getIsLoggedIn())

  const handleChangeSuggestion = (event) => {
    const suggText = event.target.value;
    setSuggestion((prevState) => ({
      ...prevState,
      text: suggText,
      name: currentUser,
    }));
  };

  const handleSubmitSuggestion = (event) => {
    event.preventDefault();
    const suggTextarea = document.getElementById("suggestion-textarea");
    dispatch(createSuggestion(suggestion));
    suggTextarea.value = "";
  };

  return (
    <div>
      {isLoggedIn && (
        <div className="row" id="footer">
          <div className="col">
            <h6 id="suggestion-title">
              Отзывы о работе сайта, его дизайне и т.д.{" "}
            </h6>
            <form onSubmit={handleSubmitSuggestion}>
              <textarea
                id="suggestion-textarea"
                name="suggest"
                onChange={handleChangeSuggestion}
              ></textarea>
              <br />
              <button type="submit" className="btn btn-success">
                Отправить
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="row">
        <p className="fs-4 pt-3 pb-3">Дополнительная информация: партнёры, поддержка, ресурсы и т.д</p>
      </div>
    </div>
  );
};

export default Footer;
