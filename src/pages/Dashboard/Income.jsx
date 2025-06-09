/*
 * File         : Income.jsx
 * Author       : Ganapathy
 * Description  : Income page component that displays income overview, list, and allows adding and deleting income.
 *               It uses various components like IncomeOverview, AddIncomeForm, IncomeList, and DeleteAlert.
 */

// Import necessary modules
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
// Import components and hooks
import IncomeOverview from "../../components/Income/IncomeOverview";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Model from "../../components/Model";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

// Income page component
const Income = () => {
  // Ensure user is authenticated
  useUserAuth();

  // State variables to manage income data, loading state, and modals
  // These states will hold the income data, loading status, and modal visibility for adding and deleting incomes
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

  // Fetch all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    // API call to get all incomes
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding an income
  const handleAddIncome = async (income) => {
    // Destructure the income object to get source, amount, date, and icon
    const { source, amount, date, icon } = income;

    // Validation Checks
    if (!source.trim()) {
      toast.error("Source is required.");
      return;
    }

    // Check if amount is a valid number greater than 0
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater then 0.");
      return;
    }

    // Check if date is provided
    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      // API call to add a new income
      // It sends the source, amount, date, and icon to the server
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      // Close the modal and show success message
      // It resets the modal state and fetches the updated income details
      setOpenAddIncomeModel(false);
      toast.success("Income added successfully.");
      fetchIncomeDetails();
    } catch (error) {
      // Handle errors during the API call
      console.error(
        "Error adding income:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle deleting an income
  const deleteIncome = async (id) => {
    try {
      // API call to delete an income by its ID
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      // Close the delete alert modal and show success message
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      // Handle errors during the delete operation
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle downloading income details
  const handleDownloadIncomeDetails = async () => {
    try {
      // API call to download income details as an Excel file
      // It requests the server to generate and return the income details in a blob format
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        { responseType: "blob" }
      );

      // Create a URL for the blob and trigger a download
      // It creates a temporary link element, sets the href to the blob URL, and clicks it to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Handle errors during the download operation
      // It logs the error and shows a toast notification to the user
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details. Please try again.");
    }
  };

  // useEffect hook to fetch income details when the component mounts
  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            {/* Income Overview */}
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>

          {/* Income List */}
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        {/* Add Income Modal */}
        <Model
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          {/* AddIncomeForm component */}
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Model>

        {/* Delete Income Modal */}
        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          {/* Delete confirmation message */}
          <DeleteAlert
            content="Are you sure you want to delete this income details?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Model>
      </div>
    </DashboardLayout>
  );
};

// Export the Income component
export default Income;
