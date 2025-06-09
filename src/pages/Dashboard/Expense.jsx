/*
 * File         : Expense.jsx
 * Author       : Ganapathy
 * Description  : Expense page component that displays expense overview, list, and allows adding and deleting expenses.
 *               It uses various components like ExpenseOverview, AddExpenseForm, ExpenseList, and DeleteAlert.
 */

// Import necessary modules
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Model from "../../components/Model";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

// Expense page component
const Expense = () => {
  // Ensure user is authenticated
  useUserAuth();

  // State variables to manage expense data, loading state, and modals
  // These states will hold the expense data, loading status, and modal visibility for adding and deleting expenses
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

  // Fetch all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);
    // API call to get all expenses
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding an expense
  const handleAddExpense = async (expense) => {
    // Destructure the expense object to get category, amount, date, and icon
    const { category, amount, date, icon } = expense;

    // Validation Checks
    if (!category.trim()) {
      toast.error("Category is required.");
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
      // API call to add a new expense
      // It sends the category, amount, date, and icon to the server
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      // Close the modal and show success message
      // It resets the modal state and fetches the updated expense details
      setOpenAddExpenseModel(false);
      toast.success("Expense added successfully.");
      fetchExpenseDetails();
    } catch (error) {
      // Handle errors during the API call

      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle deleting an expense
  const deleteExpense = async (id) => {
    try {
      // API call to delete an expense by its ID
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      // Close the delete alert modal and show success message
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      // Handle errors during the delete operation
      console.error(
        "Error deleting expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle downloading expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      // API call to download expense details as an Excel file
      // It requests the server to generate and return the expense details in a blob format
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        { responseType: "blob" }
      );

      // Create a URL for the blob and trigger a download
      // It creates a temporary link element, sets the href to the blob URL, and clicks it to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Handle errors during the download operation
      // It logs the error and shows a toast notification to the user
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  // useEffect hook to fetch expense details when the component mounts
  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            {/* Expense Overview */}
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModel(true)}
            />
          </div>

          {/* Expense List */}
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        {/* Add Expense Modal */}
        <Model
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title={"Add Expense"}
        >
          {/* AddExpenseForm component */}
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Model>

        {/* Delete Expense Modal */}
        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          {/* Delete confirmation message */}
          <DeleteAlert
            content="Are you sure you want to delete this expense  details?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Model>
      </div>
    </DashboardLayout>
  );
};

// Export the Expense component as default
export default Expense;
