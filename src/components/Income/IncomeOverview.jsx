/*
 * File         : IncomeOverview.jsx
 * Author       : Ganapathy
 * Description  : IncomeOverview component displays a bar chart of income over time and allows adding new income entries.
 */

// Import necessary modules
import React, { useEffect, useState } from "react";
import { prepareIncomeBarChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";

// IncomeOverview component
const IncomeOverview = ({ onAddIncome, transactions }) => {
  // State to hold the chart data
  // It will be used to render the bar chart
  const [chartData, setChartData] = useState([]);

  // Effect to prepare the chart data when transactions change
  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trend.
          </p>
        </div>
        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>
      <div className="mt-10">
        {/* Custom bar chart for income overview */}
        {/* It uses the chartData state to render the chart */}
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

// export the incomeoverview component
export default IncomeOverview;
