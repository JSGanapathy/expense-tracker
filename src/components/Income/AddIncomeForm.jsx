/*
 * File         : AddIncomeForm.jsx
 * Author       : Ganapathy
 * Description  : AddIncomeForm component allows users to add income details including source, amount, date, and icon.
 */

// Import necessary modules
import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerpopup from "../EmojiPickerpopup";

// AddIncomeForm component
const AddIncomeForm = ({ onAddIncome }) => {
  // State to manage income details
  // It includes source, amount, date, and icon
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });
  // Function to handle changes in the input fields
  // It updates the state of the income object with the new values
  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div>
      {/* Emoji picker for selecting an icon */}
      <EmojiPickerpopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      {/* Input fields for source, amount, and date */}
      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      {/* Button to add the income */}
      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill"
          type="button"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};
// export the addincomform component
export default AddIncomeForm;
