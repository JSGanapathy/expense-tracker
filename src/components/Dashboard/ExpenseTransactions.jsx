/*
 * File         : ExpenseTransaction.jsx
 * Author       : Ganapathy
 * Description  : ExpenseTransactions component displays a list of expense transactions with a "See All" button.
 */

// Import necessary modules
import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
// ExpenseTransactions component
const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {/* Render the list of expense transactions */}
        {transactions?.slice(0, 5)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type={"expense"}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

// export the ExpenseTransactions component
export default ExpenseTransactions;
