/*
 * File         : Last30daysExpenses.jsx
 * Author       : Ganapathy
 * Description  : Last30daysExpenses component displays a bar chart of expenses over the last 30 days.
 */

// Import necessary modules
import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

// Last30daysExpenses component
const Last30daysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);
  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      {/* Custom bar chart for last 30 days expenses */}
      <CustomBarChart data={chartData} />
    </div>
  );
};

// Export the Last30daysExpenses component
export default Last30daysExpenses;
