import { useEffect, useState } from "react";

export default function useFetchStatistics(selectedMonth) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:5000/api/statistics?month=${selectedMonth}`;
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [selectedMonth]);
  return data;
}
