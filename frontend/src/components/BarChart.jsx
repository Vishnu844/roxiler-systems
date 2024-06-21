import useFetchBarChart from "../hooks/useFetchBarChart";
import "./barChart.css";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { getMonthByValue, months } from "../utils/monthUtility";

Chart.register(LinearScale, CategoryScale, BarElement, Tooltip);

const BarChart = ({ selectedMonth }) => {
  const { chartData } = useFetchBarChart(selectedMonth);
  const month = getMonthByValue(months, selectedMonth);

  return (
    <section className="bar-chart">
      <h3>Bar Chart Status - {month}</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
        }}
      />
    </section>
  );
};

export default BarChart;
