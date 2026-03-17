import { NavLink } from "react-router-dom";
import { navItems } from "./navItems";

const SidebarContent = ({
    panelLabel = "Panel",
    homePath = "/dashboard",
}) => {
    return (
        <aside className="w-full h-full bg-white border-r shadow-sm flex flex-col p-6">

            <NavLink
                to={homePath}
                className="flex items-center gap-3 mb-10"
            >
                <div className="bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold shadow-md">
                    {panelLabel[0]}
                </div>

                <span className="text-2xl font-semibold text-gray-800">
                    {panelLabel}
                </span>
            </NavLink>

            <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium ${isActive
                                ? "bg-orange-500 text-white shadow-md"
                                : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </aside>
    );
};

export default SidebarContent;