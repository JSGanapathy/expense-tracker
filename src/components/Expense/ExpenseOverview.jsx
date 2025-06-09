/*
 * File         : ExpenseOverview.jsx
 * Author       : Ganapathy
 * Description  : ExpenseOverview component displays a line chart of expenses over time.
 */

// Import necessary modules
import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";
// ExpenseOverview component
const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  // State to hold the chart data
  const [chartData, setChartData] = useState([]);

  // Effect to prepare the chart data when transactions change
  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending trends over time and gain insights your money
            goes.
          </p>
        </div>
        <button className="add-btn" onClick={onExpenseIncome}>
          <LuPlus className="text-lg" /> Add Expense
        </button>
      </div>
      <div className="mt-10">
        {/* Custom line chart for expense overview */}
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};
// export the expenseoverview component
export default ExpenseOverview;
