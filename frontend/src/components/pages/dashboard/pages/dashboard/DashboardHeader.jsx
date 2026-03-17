import { NavLink } from "react-router-dom";
import { capitalizeLetter } from "../../../../../utils/capitalizeLetter";
import {
  FaUser,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardHeader = ({
  toggleSidebar,
  toggleMenu,
  user,
  isOpenMenu,
  menuRef
}) => {
  const menuDatas = [
    { id: 1, label: "Profile", path: "/profile", icon: FaUser },
    { id: 2, label: "Calendar", path: "/calender", icon: FaCalendarAlt },
    { id: 3, label: "Settings", path: "/settings", icon: FaCog },
    { id: 4, label: "Logout", icon: FaSignOutAlt, danger: true },
  ];

  const userName = user?.name
    ? capitalizeLetter(user.name)
    : "User";

  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <header className="relative h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-2xl text-gray-700 hover:text-orange-500 transition"
        >
          ☰
        </button>

        <h1 className="text-xl font-semibold text-gray-800">
          Dashboard
        </h1>
      </div>

      {user && (
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={toggleMenu}
        >
          <span className="text-gray-600 group-hover:text-orange-500 transition">
            Welcome {userName}
          </span>

          <div className="w-9 h-9 flex items-center justify-center bg-orange-500 text-white rounded-full font-semibold shadow-md group-hover:scale-105 transition">
            {userInitial}
          </div>
        </div>
      )}

      {isOpenMenu && (
        <div className="absolute right-6 top-14 w-56 bg-white  rounded-xl shadow-lg py-2 animate-fadeIn z-50" ref={menuRef}>

          {menuDatas.map((menuData) => {
            const Icon = menuData.icon;

            return (
              <NavLink

                key={menuData.id}
                to={menuData.path}
                className={`flex items-center gap-3 px-4 py-2 text-sm cursor-pointer transition  ${menuData.danger
                  ? "text-red-600 hover:bg-red-50 hover:scale-105 duration-300 transition-all"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                  }`}
              >
                <Icon className="text-base" />
                <span>{menuData.label}</span>
              </NavLink>
            );
          })}

        </div>
      )}
    </header>
  );
};

export default DashboardHeader;