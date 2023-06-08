import React from "react";
import { useSelector } from "react-redux";
import { getOneRule } from "../store/rule";
import { getIsLoggedIn } from "../store/user";

const RuleNecessity = ({
  ruleNumber,
  onClickNecessary,
  onClickUnnecessary,
}) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const oneRule = useSelector(getOneRule());
  const currentUser = oneRule.currUser;
  const countPrefer = Number(oneRule.countPrefer);
  const countNotPrefer = Number(oneRule.countNotPrefer);
  const necessity = oneRule.prefer;
  const unNecessity = oneRule.notPrefer;

  let usefulness;
  if (countPrefer + countNotPrefer !== 0) {
    usefulness = Math.round(
      (countPrefer / (countPrefer + countNotPrefer)) * 100
    );
  } else {
    usefulness = undefined;
  }

  let usefulnessColor;
  if (usefulness > 49) {
    usefulnessColor = "green";
  }
  if (usefulness < 50) {
    usefulnessColor = "red";
  }

  return (
    <>
      <div className="row">
        <div className="col div-title" id="div-title-likes">
          <h3>Этот закон Вам нужен?</h3>
        </div>
      </div>
      {isLoggedIn && (
        <div className="row">
          <div className="col-6" id="div-set-likes">
            <button
              id="set-likes"
              className={"button-" + (necessity ? "liked" : "not-liked")}
              username={currentUser}
              rule-number={ruleNumber}
              liked={necessity ? "liked" : "not-liked"}
              onClick={onClickNecessary}
              disabled={unNecessity}
            >
              Да
            </button>
          </div>
          <div className="col-6" id="div-set-dislikes">
            <button
              id="set-dislikes"
              className={
                "button-" + (unNecessity ? "disliked" : "not-disliked")
              }
              username={currentUser}
              rule-number={ruleNumber}
              disliked={unNecessity ? "disliked" : "not-disliked"}
              onClick={onClickUnnecessary}
              disabled={necessity}
            >
              Нет
            </button>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className="row">
          <div className="col-6">
            <p className="necessity fs-2">Да</p>
          </div>
          <div className="col-6">
            <p className="necessity fs-2">Нет</p>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-6" id="div-span-likes">
          <p id="span-likes">{countPrefer}</p>
        </div>
        <div className="col-6" id="div-span-dislikes">
          <p id="span-dislikes">{countNotPrefer}</p>
        </div>
      </div>
      {usefulness !== undefined &&  (
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
