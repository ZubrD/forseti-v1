import React from "react";
import DeputyPieChart from "./deputyPieChart";
import DeputyVoteTable from "./deputyVoteTable";
import PopuliPieChart from "./populiPieChart";
import PopuliVoteTable from "./populiVoteTable";

const RandomRuleCharts = ({
  deputyVoteYes,
  deputyVoteNo,
  deputyVoteAbstained,
  deputyNotVote,
  deputyVoteYesPr,
  deputyVoteNoPr,
  deputyVoteAbstainedPr,
  deputyNotVotePr,
  populiVoteYes,
  populiVoteYesPr,
  populiVoteNo,
  populiVoteNoPr,
  populiVoteAbstained,
  populiVoteAbstainedPr,
  resultDeputyVote,
  resultPopuliVote,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-5">
          <p className="p-title">
            Депутаты:{" "}
            <span
              style={{ color: resultDeputyVote === "За" ? "green" : "red" }}
            >
              {resultDeputyVote}
            </span>
          </p>
        </div>
        <div className="col-2">
          <p className="p-title">vs</p>
        </div>
        <div className="col-5">
          <p className="p-title">
            Народ:{" "}
            <span
              style={{ color: resultPopuliVote === "За" ? "green" : "red" }}
            >
              {resultPopuliVote}
            </span>
          </p>
        </div>
      </div>
      <div className="row">
        <DeputyPieChart
          deputyVoteYes={deputyVoteYes}
          deputyVoteNo={deputyVoteNo}
          deputyVoteAbstained={deputyVoteAbstained}
          deputyNotVote={deputyNotVote}
        />
        <DeputyVoteTable
          deputyVoteYes={deputyVoteYes}
          deputyVoteYesPr={deputyVoteYesPr}
          deputyVoteNo={deputyVoteNo}
          deputyVoteNoPr={deputyVoteNoPr}
          deputyVoteAbstained={deputyVoteAbstained}
          deputyVoteAbstainedPr={deputyVoteAbstainedPr}
          deputyNotVote={deputyNotVote}
          deputyNotVotePr={deputyNotVotePr}
        />
        <PopuliPieChart
          populiVoteYes={populiVoteYes}
          populiVoteNo={populiVoteNo}
          populiVoteAbstained={populiVoteAbstained}
        />
        <PopuliVoteTable
          populiVoteYes={populiVoteYes}
          populiVoteYesPr={populiVoteYesPr}
          populiVoteNo={populiVoteNo}
          populiVoteNoPr={populiVoteNoPr}
          populiVoteAbstained={populiVoteAbstained}
          populiVoteAbstainedPr={populiVoteAbstainedPr}
        />
      </div>
    </>
  );
};

export default RandomRuleCharts;
