import React from "react";

const DeputyVoteTable = (
  {deputyVoteYes,
  deputyVoteYesPr,
  deputyVoteNo,
  deputyVoteNoPr,
  deputyVoteAbstained,
  deputyVoteAbstainedPr,
  deputyNotVote,
  deputyNotVotePr}
) => {
  return (
    <div className="col-xs-6 col-sm-6 col-lg-3">
      <table className="table-result-voting">
        <tbody>
          <tr>
            <td>
              <div className="squ-yes"></div>
            </td>
            <td>
              <div id="v-yes">
                За: {deputyVoteYes} голосов, {deputyVoteYesPr}%
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="squ-no"></div>
            </td>
            <td>
              <div id="v-no">
                Против: {deputyVoteNo} голосов, {deputyVoteNoPr}%
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="squ-abs"></div>
            </td>
            <td>
              <div id="v-abstained">
                Воздержались: {deputyVoteAbstained} голосов,{" "}
                {deputyVoteAbstainedPr}%
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="squ-not-v"></div>
            </td>
            <td>
              <div id="v-not-vote">
                Не голосовали: {deputyNotVote} голосов, {deputyNotVotePr}%
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DeputyVoteTable;
