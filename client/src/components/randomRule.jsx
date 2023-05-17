import React from "react";
import DeputyPieChart from "./deputyPieChart";
import RandomRuleCharts from "./randomRuleCharts";

const RandomRule = ({ randomRule }) => {
  console.log(randomRule);
  let ruleNumber;
  let ruleTitle;
  let deputyVoteYes;
  let deputyVoteNo;
  let deputyVoteAbstained;
  let deputyNotVote;
  let deputyVoteTotal;
  let deputyVoteYesPr;
  let deputyVoteNoPr;
  let deputyVoteAbstainedPr;
  let deputyNotVotePr;
  let populiVoteYes;
  let populiVoteNo;
  let populiVoteAbstained;
  let resultDeputyVote;
  let resultPopuliVote;
  let populiVoteTotal;
  let populiVoteYesPr;
  let populiVoteNoPr;
  let populiVoteAbstainedPr;

  if (randomRule) {
    ruleNumber = randomRule.rule[0].rule_number;
    ruleTitle = randomRule.rule[0].title;
    deputyVoteYes = Number(randomRule.deputyVoteYes);
    deputyVoteNo = Number(randomRule.deputyVoteNo);
    deputyVoteAbstained = Number(randomRule.deputyVoteAbst);
    deputyNotVote = Number(randomRule.deputyNotVote);

    populiVoteYes = Number(randomRule.populiVoteYes);
    populiVoteNo = Number(randomRule.populiVoteNo);
    populiVoteAbstained = Number(randomRule.populiVoteAbst);

    resultDeputyVote = randomRule.rule[0].result_deputy_vote;
    resultPopuliVote = randomRule.rule[0].result_populi_vote;

    deputyVoteTotal =
      deputyVoteYes + deputyVoteNo + deputyVoteAbstained + deputyNotVote;
    if (deputyVoteTotal) {
      deputyVoteYesPr =
        Math.round((deputyVoteYes / deputyVoteTotal) * 100 * 10) / 10; // Округление до одного знака: *10 и /10
      deputyVoteNoPr =
        Math.round((deputyVoteNo / deputyVoteTotal) * 100 * 10) / 10;
      deputyVoteAbstainedPr =
        Math.round((deputyVoteAbstained / deputyVoteTotal) * 100 * 10) / 10;
      deputyNotVotePr =
        Math.round((deputyNotVote / deputyVoteTotal) * 100 * 10) / 10;
    }

    populiVoteTotal = populiVoteYes + populiVoteNo + populiVoteAbstained;
    if (populiVoteTotal) {
      populiVoteYesPr =
        Math.round((populiVoteYes / populiVoteTotal) * 100 * 10) / 10; // Округление до одного знака: *10 и /10
      populiVoteNoPr =
        Math.round((populiVoteNo / populiVoteTotal) * 100 * 10) / 10;
      populiVoteAbstainedPr =
        Math.round((populiVoteAbstained / populiVoteTotal) * 100 * 10) / 10;
    }
  }
  return (
    <>
      <div className="row">
        <div className="col col-title">
          <p className="p-title">Голосование по закону {ruleNumber}</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="p-random-rule">
            <a
              href={`/rule/${ruleNumber}`}
              target="_blank"
              className="a-random-rule"
            >
              {ruleTitle}
            </a>
          </p>
        </div>
      </div>
      <RandomRuleCharts
        deputyVoteYes={deputyVoteYes}
        deputyVoteYesPr={deputyVoteYesPr}
        deputyVoteNo={deputyVoteNo}
        deputyVoteNoPr={deputyVoteNoPr}
        deputyVoteAbstained={deputyVoteAbstained}
        deputyVoteAbstainedPr={deputyVoteAbstainedPr}
        deputyNotVote={deputyNotVote}
        deputyNotVotePr={deputyNotVotePr}
        populiVoteYes={populiVoteYes}
        populiVoteYesPr={populiVoteYesPr}
        populiVoteNo={populiVoteNo}
        populiVoteNoPr={populiVoteNoPr}
        populiVoteAbstained={populiVoteAbstained}
        populiVoteAbstainedPr={populiVoteAbstainedPr}
        resultDeputyVote={resultDeputyVote}
        resultPopuliVote={resultPopuliVote}
      />
    </>
  );
};

export default RandomRule;
