import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <ul className="space-y-3">
          <li className="cursor-pointer hover:text-gray-300">Rooms</li>
          <li className="cursor-pointer hover:text-gray-300">Expenses</li>
          <li className="cursor-pointer hover:text-gray-300">Settlements</li>
        </ul>
      </div>

      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  ); 
};

export default PrivateLayout;