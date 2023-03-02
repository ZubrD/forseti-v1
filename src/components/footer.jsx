import React from "react";

const Footer = () => {
  return (
    <div className="container">
      <div className="row" id="footer">
        <div className="col">
          <h6 id="suggestion-title">
            Отзывы о работе сайта, его дизайне и т.д.{" "}
          </h6>
          <form>
            <textarea
              id="suggestion-textarea"
              name="suggestion_text"
            ></textarea>
            <input
              type="hidden"
              name="suggestion_author"
              value="{{ user.username }}"
            />
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
