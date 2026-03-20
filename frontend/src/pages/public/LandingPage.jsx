import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <div className="flex justify-between items-center px-8 py-4 shadow-sm">
        <h1 className="text-xl font-bold">SplitWiseX</h1>

        <button
          onClick={() => navigate("/login")}
          className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          Login
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Split Expenses Easily 💸
        </h1>

        <p className="text-gray-600 mb-6 max-w-lg">
          Manage room expenses, track payments, and settle balances with friends — all in one place.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-black text-white px-6 py-3 rounded-xl text-lg hover:opacity-90"
        >
          Get Started 🚀
        </button>
      </div>
    </div>
  );
};

export default Landing;