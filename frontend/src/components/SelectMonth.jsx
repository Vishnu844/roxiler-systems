import React from "react";
import { months } from "../utils/monthUtility";

const SelectMonth = ({ setSelectedMonth }) => {
  const style = {
    padding: "8px",
    border: 0,
    backgroundColor: "#f0f0f0",
    outline: "none",
    borderRadius: "5px",
    marginRight: "10px"
  };
  return (
    <>
      <select
        name="month"
        style={style}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">Select month</option>
        {Object.keys(months).map((month, index) => (
          <option
            selected={month === "March" ? true : false}
            key={month}
            value={months[month]}
          >
            {month}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectMonth;
