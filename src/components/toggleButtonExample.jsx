import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function ToggleButtonExample() {
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [abstained, setAbstained] = useState(false);
  const handleClick = (event) => {
    const labelFor = event.target.htmlFor;
    const radioInput = document.querySelector(`#${labelFor}`);
    if (radioInput.id === "radio-1") {
      setYes((prevState) => !prevState);
      setNo(false);
      setAbstained(false);
    } else if (radioInput.id === "radio-2") {
      setNo((prevState) => !prevState);
      setYes(false);
      setAbstained(false);
    } else if (radioInput.id === "radio-3") {
      setAbstained((prevState) => !prevState);
      setYes(false);
      setNo(false);
    }
  };

  return (
    <>
      <ButtonGroup className="btn-group d-flex justify-content-center">
        <ToggleButton
          className="fs-3 mt-5 mb-5"
          key="1"
          id="radio-1"
          variant={yes ? "success" : "outline-success"}
          size="lg"
          value="1"
          onClick={handleClick}
        >
          За
        </ToggleButton>
        <ToggleButton
          className="fs-3 mt-5 mb-5"
          key="2"
          id={`radio-2`}
          variant={no ? "danger" : "outline-danger"}
          value="2"
          onClick={handleClick}
        >
          Против
        </ToggleButton>
        <ToggleButton
          className="fs-3 mt-5 mb-5"
          key="3"
          id={`radio-3`}
          variant={abstained ? "info" : "outline-info"}
          value="3"
          onClick={handleClick}
        >
          Воздержался
        </ToggleButton>
      </ButtonGroup>
    </>
  );
}
export default ToggleButtonExample;
