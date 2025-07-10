import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Layers, Megaphone, Clock } from "lucide-react";
import { useAuth } from "./AuthContext";

const DashboardOverview = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const stats = [
    {
      id: 1,
      label: "Total Segments",
      value: 12,
      icon: <Layers className="w-8 h-8 text-purple-600" />,
      bg: "bg-purple-100",
      route: "/create-segment",
    },
    {
      id: 2,
      label: "Active Campaigns",
      value: 5,
      icon: <Megaphone className="w-8 h-8 text-blue-600" />,
      bg: "bg-blue-100",
      route: "/campaign-history",
    },
    {
      id: 3,
      label: "Your Profile",
      value: 1,
      icon: <Users className="w-8 h-8 text-green-600" />,
      bg: "bg-green-100",
      route: "/edit-profile",
    },
    {
      id: 4,
      label: "Edit Segments",
      value: 3,
      icon: <Clock className="w-8 h-8 text-yellow-500" />,
      bg: "bg-yellow-100",
      route: "/segment-preview",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center flex items-center justify-center gap-2">
        <span className="text-4xl">📊</span> Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            onClick={() => navigate(stat.route)}
            className={`cursor-pointer rounded-2xl p-6 flex flex-col items-center shadow-md ${stat.bg} hover:scale-[1.04] transition-transform duration-300 group`}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow group-hover:bg-gray-50 mb-4">
              {stat.icon}
            </div>
            <span className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</span>
            <p className="text-lg font-medium text-gray-600 text-center">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
