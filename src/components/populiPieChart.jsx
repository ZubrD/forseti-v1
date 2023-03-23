import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2"; // Подсказки здесь https://react-chartjs-2.js.org/components/pie

const PopuliPieChart = ({
  populiVoteYes,
  populiVoteNo,
  populiVoteAbstained,
}) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const dataPie = {
    labels: ["За", "Против", "Воздержались"],
    datasets: [
      {
        data: [populiVoteYes, populiVoteNo, populiVoteAbstained],
        backgroundColor: ["green", "red", "lightblue"],
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
  return (
    <div className="col-xs-6 col-sm-6 col-lg-3 col-simple chart-pos">
      <div className="populi-chart">
        <Pie data={dataPie} options={optionsPie} />
      </div>
    </div>
  );
};

export default PopuliPieChart;
