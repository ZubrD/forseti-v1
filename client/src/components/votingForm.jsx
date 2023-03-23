import React, { useState } from "react";
import ToggleButtonVote from "./toggleButtonVote";
import { userVoting } from "../store/rule";
import { useDispatch } from "react-redux";
import ButtonSendResultVote from "./buttonSendResultVote";

const VotingForm = ({ userVote, currentUser, ruleNumber }) => {
  const dispatch = useDispatch();
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [abstained, setAbstained] = useState(false);
  const [resultVote, setResultVote] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const handleVoteClick = (event) => {
    const labelFor = event.target.htmlFor;
    const radioInput = document.querySelector(`#${labelFor}`);

    if (radioInput.id === "yes-vote") {
      setYes((prevState) => !prevState);
      setNo(false);
      setAbstained(false);
      setResultVote("За");
    } else if (radioInput.id === "no-vote") {
      setNo((prevState) => !prevState);
      setYes(false);
      setAbstained(false);
      setResultVote("Против");
    } else if (radioInput.id === "abstained-vote") {
      setAbstained((prevState) => !prevState);
      setYes(false);
      setNo(false);
      setResultVote("Воздержался");
    }
  };

  const handleResultVote = () => {
    dispatch(userVoting(resultVote, currentUser, ruleNumber));
  };

  const handleDiscardVote = () => {
    const resultVote = "Не голосовал";
    dispatch(userVoting(resultVote, currentUser, ruleNumber));
  };

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
              <ToggleButtonVote
                onVoteClick={handleVoteClick}
                yes={yes}
                no={no}
                abstained={abstained}
              />
              <ButtonSendResultVote onClick={handleResultVote} yes={yes} no={no} abstained={abstained}/>
            </>
          ) : (
            <>
              <div style={{ textAlign: "center" }}>
                По этому закону Вы уже проголосовали ("
                {userVote}")
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger"
                  id="delete-voting"
                  name="{{ user.username }}"
                  rule-number="{{ rule.rule_number }}"
                  onClick={handleDiscardVote}
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
