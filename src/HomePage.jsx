import React from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const displayName = user?.name || "User";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-800 p-6 flex flex-col items-center shadow-2xl rounded-r-3xl min-h-screen">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/logo.png"
            alt="Xeno Logo"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-white object-contain mb-2"
          />
          <h2 className="text-lg font-bold text-blue-400 mt-2">Xeno CRM</h2>
        </div>
        {/* User Welcome */}
        <h2 className="text-xl font-semibold text-center mb-6">
          Welcome, <span className="text-blue-400">{displayName}</span>
        </h2>
        {/* Navigation */}
        <nav className="flex flex-col gap-4 w-full">
          <button
            onClick={() => navigate("/create-segment")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded-xl shadow font-medium transition w-full"
          >
            <span className="text-xl">➕</span> Create Segment
          </button>
          <button
            onClick={() => navigate("/campaign-history")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 py-3 px-4 rounded-xl shadow font-medium transition w-full"
          >
            <span className="text-xl">📊</span> View Campaigns
          </button>
          <button
            onClick={() => navigate("/edit-profile")}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 py-3 px-4 rounded-xl shadow font-medium transition w-full text-black"
          >
            <span className="text-xl">✏️</span> Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 py-3 px-4 rounded-xl shadow font-medium transition w-full"
          >
            <span className="text-xl">🚪</span> Logout
          </button>
        </nav>
        <footer className="text-xs text-center mt-auto text-gray-400 pt-8">
          © {new Date().getFullYear()} Xeno CRM
        </footer>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100 min-h-screen overflow-y-auto">
        <div className="bg-white text-gray-800 rounded-3xl p-8 shadow-2xl min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
