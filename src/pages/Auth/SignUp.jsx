/*
 * File         : SignUp.jsx
 * Author       : Ganapathy
 * Description  : SignUp component allows users to create a new account by providing their details.
 */

// Import necessary modules
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Import components and utilities
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

// SignUp page component
const SignUp = () => {
  // State variables to manage form inputs and error messages
  // These states will hold the values of profile picture, full name, email, password, and any error messages
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // Use global state to update user information
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageURL = "";
    // Validate form inputs
    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }
    // Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    // Validate password
    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");
    // Proceed with signup logic (e.g., API call)
    try {
      // If a profile picture is selected, upload it and get the URL
      // The uploadImage function handles the image upload and returns the image URL
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageURL = imgUploadRes.imageUrl || "";
      }
      // Make API call to register the user
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname: fullName,
        email: email,
        password: password,
        profileImageUrl: profileImageURL,
      });
      // Destructure the token and user from the response data
      const { token, user } = response.data;

      // If token is received, store it in localStorage and update the user context
      // Navigate to the dashboard
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle errors during the signup process
      // If the error response contains a message, set it as the error state
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
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>
        {/* Sign-up form */}
        <form onSubmit={handleSignUp}>
          {/* Profile photo selector */}
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          {/* Input fields for full name, email, and password */}
          {/* These fields are used to collect user information for account creation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="example@gmail.com"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Minimum 8 characters"
                type="password"
              />
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          {/* Login link */}
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};
// Export the SignUp component
export default SignUp;
