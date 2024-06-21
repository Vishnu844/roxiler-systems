import { useEffect, useState } from "react";

export default function useFetchBarChart(selectedMonth) {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const url = `http://localhost:5000/api/bar-chart?month=${selectedMonth}`;
        const res = await fetch(url);
        const data = await res.json();
        const labels = data?.data?.map((item) => item.range);
        const counts = data?.data?.map((item) => item.count);
        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Items",
              data: counts,
              backgroundColor: "cornflowerblue",
              borderColor: "lightblue",
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchChartData();
  }, [selectedMonth]);
  return { chartData };
}
