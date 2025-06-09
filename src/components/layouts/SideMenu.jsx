/*
 * File         : Navbar.jsx
 * Author       : Ganapathy
 * Description  : SideMenu component displays a sidebar with user information and navigation links.
 */

// Import necessary modules
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { SIDE_MENU_DATA } from "../../utils/data";
import CharAvatar from "../Cards/CharAvatar";

// Sidemenu component
const SideMenu = ({ activeMenu }) => {
  // Access user context to get user information and clear user function
  // useContext hook is used to access the UserContext
  const { user, clearUser } = useContext(UserContext);

  // useNavigate hook is used to programmatically navigate to different routes
  const navigate = useNavigate();

  // Function to handle click events on menu items
  // It checks if the clicked route is "logout", if so, it calls handleLogout
  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  // Function to handle logout
  // It clears local storage, calls clearUser to reset user state, and navigates to the login page
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullname}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullname || ""}
        </h5>
      </div>
      {/* Side menu items */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          onClick={() => handleClick(item.path)}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3 cursor-pointer`}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

// export the sidemenu component
export default SideMenu;
