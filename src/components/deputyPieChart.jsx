import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2"; // Подсказки здесь https://react-chartjs-2.js.org/components/pie

const DeputyPieChart = (
  {deputyVoteYes,
  deputyVoteNo,
  deputyVoteAbstained,
  deputyNotVote}
) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const dataPie = {
    labels: ["За", "Против", "Воздержались", "Не голосовали"],
    datasets: [
      {
        data: [deputyVoteYes, deputyVoteNo, deputyVoteAbstained, deputyNotVote],
        backgroundColor: ["green", "red", "lightblue", "gray"],
        borderColor: ["white", "white", "white"],
        borderWidth: 1,
      },
    ],
  };

  const optionsPie = {
    tooltips: {
      backgroundColor: "white",
      bodyFontColor: "black",
      bodyFontSize: 18,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return <Pie data={dataPie} options={optionsPie} />;
};

export default DeputyPieChart;
