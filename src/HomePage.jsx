import React from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-2xl flex flex-col p-6 space-y-8">
        {/* Logo + Welcome */}
        <div className="flex flex-col items-center text-center">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">
            Welcome, <span className="text-blue-600">{user?.name || "User"}</span>
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/create-segment")}
            className="py-3 px-4 w-full text-left bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition-all"
          >
            ➕ Create Segment
          </button>
          <button
            onClick={() => navigate("/campaign-history")}
            className="py-3 px-4 w-full text-left bg-green-600 text-white rounded-lg shadow hover:bg-green-700 hover:shadow-md transition-all"
          >
            📊 View Campaigns
          </button>
          <button
            onClick={handleLogout}
            className="py-3 px-4 w-full text-left bg-red-500 text-white rounded-lg shadow hover:bg-red-600 hover:shadow-md transition-all"
          >
            🚪 Logout
          </button>
        </nav>

        <div className="mt-auto text-sm text-gray-400 text-center">
          &copy; {new Date().getFullYear()} Xeno CRM
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
