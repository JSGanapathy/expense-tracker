/*
 * File         : RecentIncomeWithChart.jsx
 * Author       : Ganapathy
 * Description  : RecentIncomeWithChart component displays a pie chart of recent income sources.
 */

// Import necessary modules
import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

// Define color code
const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

// RecentIncomeWithChart component
const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      {/* Custom pie chart for recent income */}
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

// Export the RecentIncomeWithChart component
export default RecentIncomeWithChart;
