/*
 * File         : Home.jsx
 * Author       : Ganapathy
 * Description  : Home page component that displays the dashboard with financial overview, recent transactions, and income/expense details.
 */

// Import necessary modules
import { useEffect, useState } from "react";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
// Import components and hooks
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";

import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30daysExpenses from "../../components/Dashboard/Last30daysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

// Home page component
const Home = () => {
  // Ensure user is authenticated
  useUserAuth();

  // Use navigate hook for navigation
  const navigate = useNavigate();

  // State variables
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  // Fetch dashboard data
  const fetchDashboardData = async () => {
    // If already loading, return to prevent multiple requests
    // This check prevents multiple API calls if the component is already loading data
    if (loading) return;

    // Set loading state to true before making the API call
    // This sets the loading state to true, indicating that data is being fetched
    setLoading(true);

    try {
      // Make an API call to fetch dashboard data
      // This API call retrieves the dashboard data from the server
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      // If the response contains data, update the dashboardData state
      // This checks if the response data is available and updates the state accordingly
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      // Log an error message if the API call fails
      // This catches any errors that occur during the API call and logs them to the console
      console.error("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard data when the component mounts
  // This useEffect hook runs once when the component mounts to fetch the initial dashboard data
  useEffect(() => {
    // Call the fetchDashboardData function to get the dashboard data
    // This ensures that the dashboard data is fetched when the component is first rendered
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Info cards for financial overview */}
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Recent Transactions */}
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          {/* Finance Overview */}
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          {/* Expense Transactions */}
          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          {/* Last 30 Days Expenses */}
          <Last30daysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          {/* Recent Income with Chart */}
          <RecentIncomeWithChart
            data={
              dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />

          {/* Recent Income */}
          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

// export the Home component
export default Home;
