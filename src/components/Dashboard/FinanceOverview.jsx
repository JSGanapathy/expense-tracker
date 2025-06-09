/*
 * File         : FinanceOverview.jsx
 * Author       : Ganapathy
 * Description  : FinanceOverview component displays a pie chart with financial data.
 */

// Import necessary modules
import CustomPieChart from "../Charts/CustomPieChart";
// Define color
const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

// FinanceOverview component
const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      {/* Custom pie chart for financial overview */}
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

// export the FinanceOverview component
export default FinanceOverview;
