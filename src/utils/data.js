/*
 * File         : data.js
 * Author       : Ganapathy
 * Description  : This file contains the side menu data for the Expense Tracker application.
 *               It includes menu items with their respective labels, icons, and paths.
 */

import {
  LuLayoutDashboard,
  LuHandCoins,
  LuLogOut,
  LuWalletMinimal,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  { id: "01", label: "Dashboard", icon: LuLayoutDashboard, path: "/dashboard" },
  { id: "02", label: "Income", icon: LuWalletMinimal, path: "/income" },
  { id: "03", label: "Expense", icon: LuHandCoins, path: "/expense" },
  { id: "06", label: "Logout", icon: LuLogOut, path: "/login" },
];
