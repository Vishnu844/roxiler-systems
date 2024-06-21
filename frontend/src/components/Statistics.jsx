import React from "react";
import "./statistics.css";
import { months } from "../utils/monthUtility";
import { getMonthByValue } from "../utils/monthUtility";
import useFetchStatistics from "../hooks/useFetchStatistics";

const Statistics = ({ selectedMonth }) => {
  const { data } = useFetchStatistics(selectedMonth);
  return (
    <>
      <section className="statistics">
        <h3>Statistics - {getMonthByValue(months, selectedMonth)}</h3>
        <div className="table">
          <div className="field">
            <h4>Total Sale</h4>
            <p>${data?.totalSaleAmount}</p>
          </div>
          <div className="field">
            <h4>Total sold item</h4>
            <p>{data?.totalSoldItems}</p>
          </div>
          <div className="field">
            <h4>Total not sold item</h4>
            <p>{data?.totalNotSoldItems}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Statistics;
