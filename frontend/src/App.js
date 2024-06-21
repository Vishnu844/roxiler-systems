import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SelectMonth from "./components/SelectMonth";
import Table from "./components/Table";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(3);

  const searchTable = (newSearchValue) => {
    setSearchValue(newSearchValue);
  };

  return (
    <>
      <div className="transactions-table-top">
        <SearchBar searchTable={searchTable} />
        <div className="transactions-table-top-right">
          <SelectMonth setSelectedMonth={setSelectedMonth} />
        </div>
      </div>
      <Table searchValue={searchValue} selectedMonth={selectedMonth} />
      <Statistics selectedMonth={selectedMonth} />
      <div className="chart-wrapper">
        <BarChart selectedMonth={selectedMonth} />
      </div>
    </>
  );
}

export default App;
