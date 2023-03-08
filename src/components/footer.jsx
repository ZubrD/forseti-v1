import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSuggestion } from "../store/rule";

const Footer = ({ currentUser }) => {
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
    // console.log(suggestion);
    const suggTextarea = document.getElementById("suggestion-textarea");
    dispatch(createSuggestion(suggestion))
    suggTextarea.value = "";
  };

  return (
    <div className="container">
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
          <p>Дополнительная информация: партнёры, поддержка, ресурсы и т.д</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
