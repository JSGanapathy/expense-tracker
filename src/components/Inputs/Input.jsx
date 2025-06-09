/*
 * File         : Input.jsx
 * Author       : Ganapathy
 * Description  : Input component provides a reusable input field with optional password visibility toggle.
 */

// Import necessary modules
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// Input component
// It accepts value, onChange, placeholder, label, and type as props
const Input = ({ value, onChange, placeholder, label, type }) => {
  // State to manage password visibility
  // It toggles between showing and hiding the password
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className="input-box">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />
        {/* Password visibility toggle */}
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

// export Input component
export default Input;
