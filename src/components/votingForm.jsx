import React from "react";

const VotingForm = ({userVote}) => {
  return (
    <>
      <div className="row">
        <div className="col div-title">
          <h3>Ваше мнение по этому документу</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {userVote === "Не голосовал" ? (
            <form id="vote_form" method="POST">
              <div
                className="btn-group d-flex justify-content-center"
                role="group"
                aria-label="Basic radio toggle button group"
                id="select-vote-group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autoComplete="off"
                  value="За"
                />
                <label
                  className="btn btn-outline-primary radio-font"
                  htmlFor="btnradio1"
                >
                  За
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autoComplete="off"
                  value="Против"
                />
                <label
                  className="btn btn-outline-primary radio-font"
                  htmlFor="btnradio2"
                >
                  Против
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio3"
                  autoComplete="off"
                  value="Воздержался"
                />
                <label
                  className="btn btn-outline-primary radio-font"
                  htmlFor="btnradio3"
                >
                  Воздержался
                </label>
              </div>
              <div
                className="col d-flex justify-content-center"
                id="div-send-vote"
              >
                <input
                  type="hidden"
                  name="person"
                  value="{{ user.username }}"
                />
                <input
                  type="hidden"
                  name="rule"
                  value="{{ rule.rule_number }}"
                />
                <input
                  type="submit"
                  value="Проголосовать"
                  id="button-send-vote"
                  className="btn btn-success"
                  disabled
                />
              </div>
            </form>
          ) : (
            <>
              <div style={{ textAlign: "center" }}>
                По этому закону Вы уже проголосовали ("
                {userVote}")
              </div>
              <div className="d-flex justify-content-center">
                <button
                  id="delete-voting"
                  name="{{ user.username }}"
                  rule-number="{{ rule.rule_number }}"
                >
                  Отменить голосование?
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VotingForm;
