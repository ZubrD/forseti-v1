import React from "react";

const RuleNecessity = ({
  necessity,
  currentUser,
  ruleNumber,
  onClickNecessary,
  unNecessity,
  onClickUnnecessary,
  countPrefer,
  countNotPrefer,
  usefulness,
  usefulnessColor,
}) => {
  return (
    <>
      <div className="row">
        <div className="col div-title" id="div-title-likes">
          <h3>Этот закон Вам нужен?</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-6" id="div-set-likes">
          <button
            id="set-likes"
            className={"button-" + (necessity ? "liked" : "not-liked")}
            username={currentUser}
            rule-number={ruleNumber}
            liked={necessity ? "liked" : "not-liked"}
            onClick={onClickNecessary}
          >
            Да
          </button>
        </div>
        <div className="col-6" id="div-set-dislikes">
          <button
            id="set-dislikes"
            className={"button-" + (unNecessity ? "disliked" : "not-disliked")}
            rule-number={ruleNumber}
            disliked={unNecessity ? "disliked" : "not-disliked"}
            onClick={onClickUnnecessary}
          >
            Нет
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-6" id="div-span-likes">
          <p id="span-likes">{countPrefer}</p>
        </div>
        <div className="col-6" id="div-span-dislikes">
          <p id="span-dislikes">{countNotPrefer}</p>
        </div>
      </div>
      {usefulness && (
        <div className="row">
          <div className="col">
            <p id="p-usefulness" style={{ color: usefulnessColor }}>
              Нужность данного закона составляет {usefulness}%
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RuleNecessity;
