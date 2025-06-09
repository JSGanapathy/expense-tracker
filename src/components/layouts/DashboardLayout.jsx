/*
 * File         : DashboardLayout.jsx
 * Author       : Ganapathy
 * Description  : DashboardLayout component provides a layout for the dashboard, including a navbar and side menu.
 */

// Import necessary modules
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

// Dashboard component
const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      {/* Navbar */}
      <Navbar activeMenu={activeMenu} />
      {/* Main Content */}
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            {/* Side Menu */}
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

// export the dashboardlayout component
export default DashboardLayout;
