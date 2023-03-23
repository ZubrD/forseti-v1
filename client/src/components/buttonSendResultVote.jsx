import React from "react";

const ButtonSendResultVote = ({ onClick, yes, no, abstained }) => {
  const testDisabled = Boolean(yes + no + abstained);           // Если ни один вариант не выбран, голосование невозможно
  return (
    <div
      className="col d-flex justify-content-center pt-3 pb-3"
      id="div-send-vote"
    >
      <button
        id="send-vote-result"
        className="btn btn-success btn-lg fs-3"
        onClick={onClick}
        disabled={!testDisabled}
      >
        Проголосовать
      </button>
    </div>
  );
};

export default ButtonSendResultVote;
