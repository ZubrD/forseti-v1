import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function ToggleButtonVote({ onVoteClick, yes, no, abstained }) {
  return (
    <>
      <ButtonGroup className="btn-group d-flex justify-content-center">
        <ToggleButton
          className="fs-3 mt-5 mb-5"
          key="1"
          id="yes-vote"
          variant={yes ? "success" : "outline-success"}
          size="lg"
          value="1"
          onClick={onVoteClick}
        >
          За
        </ToggleButton>
        <ToggleButton
          className="fs-3 mt-5 mb-5"
          key="2"
          id="no-vote"
          variant={no ? "danger" : "outline-danger"}
          value="2"
          onClick={onVoteClick}
        >
          Против
        </ToggleButton>
        <ToggleButton
          className="fs-3 mt-5 mb-5"
          key="3"
          id="abstained-vote"
          variant={abstained ? "info" : "outline-info"}
          value="3"
          onClick={onVoteClick}
        >
          Воздержался
        </ToggleButton>
      </ButtonGroup>
    </>
  );
}
export default ToggleButtonVote;
