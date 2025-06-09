/*
 * File         : Login.jsx
 * Author       : Ganapathy
 * Description  : Login component allows users to log in to the Expense Tracker application.
 */

// Import necessary modules
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

// Login page
const Login = () => {
  // State to manage email, password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // useContext hook to access UserContext
  const { updateUser } = useContext(UserContext);

  // useNavigate hook to programmatically navigate to different routes
  // It is used to navigate to the dashboard after successful login
  const navigate = useNavigate();

  // Function to handle login
  // It validates the email and password, makes an API call to log in, and updates the user state
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    // Make API call to log in
    // It sends the email and password to the server and receives a token and user information
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>
        {/* Login form */}
        <form onSubmit={handleLogin}>
          {/* Email input */}
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="example@gmail.com"
            type="text"
          />
          {/* Password input */}
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Minimum 8 characters"
            type="password"
          />
          {/* Error message */}
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          {/* Submit button */}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          {/* SignUp link */}
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary underline font-medium">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

// export the Login component
export default Login;
