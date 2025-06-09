/*
 * File         : useUserAuth.jsx
 * Author       : Ganapathy
 * Description  : Custom hook for user authentication.
 */

// Import necessary modules
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

// export the useUserAuth hook
export const useUserAuth = () => {
  // Destructure user, updateUser, and clearUser from UserContext
  // useContext hook is used to access the UserContext
  const { user, updateUser, clearUser } = useContext(UserContext);
  // useNavigate hook is used to programmatically navigate to different routes
  const navigate = useNavigate();

  // useEffect hook to fetch user information when the component mounts
  // It checks if the user is already authenticated, if not, it fetches user info from the server
  useEffect(() => {
    if (user) return;

    let isMounted = true;
    // Function to fetch user information from the server
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);

        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate]);
};
