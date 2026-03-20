import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* You can add navbar later */}
      <Outlet />
    </div>
    
  );
};

export default PublicLayout;