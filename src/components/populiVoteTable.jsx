import React from "react";

const PopuliVoteTable = ({
  populiVoteYes,
  populiVoteYesPr,
  populiVoteNo,
  populiVoteNoPr,
  populiVoteAbstained,
  populiVoteAbstainedPr,
}) => {
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
                За: {populiVoteYes} голосов, {populiVoteYesPr}%
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="squ-no"></div>
            </td>
            <td>
              <div id="v-no">
                Против: {populiVoteNo} голосов, {populiVoteNoPr}%
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="squ-abs"></div>
            </td>
            <td>
              <div id="v-abstained">
                Воздержались: {populiVoteAbstained} голосов,{" "}
                {populiVoteAbstainedPr}%
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PopuliVoteTable;
