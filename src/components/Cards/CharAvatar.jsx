/*
 * File         : CharAvatar.jsx
 * Author       : Ganapathy
 * Description  : CharAvatar component displays a circular avatar with the initials of the provided full name.
 */

import { getInitials } from "../../utils/helper";

// CharAvatar component
const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`${width || "w-12"} ${height || "h-12"} ${
        style || ""
      } flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

// export the CharAvatar component
export default CharAvatar;
