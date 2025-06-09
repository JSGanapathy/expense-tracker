/*
 * File         : AddExpenseForm.jsx
 * Author       : Ganapathy
 * Description  : AddExpenseForm component allows users to add a new expense with category, amount, date, and icon selection.
 */

// Import necessary modules
import { useState } from "react";
import EmojiPickerpopup from "../EmojiPickerpopup";
import Input from "../Inputs/Input";

// AddExpenseForm component
const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });
  // Function to handle changes in the input fields
  // It updates the state of the expense object with the new values
  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <div>
      {/* Emoji picker for selecting an icon */}
      <EmojiPickerpopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      {/* Input fields for category, amount, and date */}
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder={"Rent, Groceries, etc"}
        type={"text"}
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder={""}
        type={"number"}
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder={""}
        type={"date"}
      />
      {/* Button to add the expense */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

// Export the AddExpenseForm component
export default AddExpenseForm;
