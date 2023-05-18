import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSuggestion } from "../store/rule";

const Footer = ({ currentUser, isLoggedIn }) => {
  const dispatch = useDispatch();
  const [suggestion, setSuggestion] = useState();

  const handleChangeSuggestion = (event) => {
    const suggText = event.target.value;
    const suggAuthor = event.target.attributes["author"].value;
    setSuggestion((prevState) => ({
      ...prevState,
      text: suggText,
      name: suggAuthor ? suggAuthor : "anonim",
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
                author={currentUser}
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
