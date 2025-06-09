/*
 * File         : AddExpenseForm.jsx
 * Author       : Ganapathy
 * Description  : AddExpenseForm component allows users to add a new expense with category, date, amount, and description.
 */

// Import necessary modules
import { LuDownload } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

// ExpenseList component
const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expenses</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Render the list of expense transactions */}
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type={"expense"}
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};
// export the expenselist component
export default ExpenseList;
