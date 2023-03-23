import React from "react";

const VotingResults = ({
  resultDeputyVoteColor,
  resultDeputyVote,
  resultPopuliVoteColor,
  resultPopuliVote,
}) => {
  return (
    <>
      <div className="row">
        {/* Если прошло голосование и FinalTable заполнена */}
        <div className="col div-title">
          <h3>Голосование</h3>
        </div>
      </div>
      <div className="row" id="one_rule_result_deputy">
        <div className="col-6 div-title">
          <h4>
            Депутаты:{" "}
            <span style={{ color: resultDeputyVoteColor }}>
              {resultDeputyVote}
            </span>
          </h4>
        </div>
        <div className="col-6 div-title">
          <h4>
            Народ:{" "}
            <span style={{ color: resultPopuliVoteColor }}>
              {resultPopuliVote}
            </span>
          </h4>
        </div>
      </div>
    </>
  );
};

export default VotingResults;
