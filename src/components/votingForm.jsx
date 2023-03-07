import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ToggleButtonExample from "./toggleButtonExample";

const VotingForm = ({ userVote }) => {
  const handleClick = (event) => {
    console.log(event.target.value);
  };
  console.log(userVote);

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
            <>
              <ToggleButtonExample />
              <div
                className="col d-flex justify-content-center pt-3 pb-3"
                id="div-send-vote"
              >
                <button className="btn btn-success btn-lg fs-3">
                  Проголосовать
                </button>
              </div>
            </>
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
