import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Layers, Megaphone, Clock } from "lucide-react"; // Ensure installed

const DashboardOverview = () => {
  const navigate = useNavigate();

  const stats = [
    {
      id: 1,
      label: "Total Segments",
      value: 12,
      icon: <Layers className="w-6 h-6 text-white" />,
      bg: "from-purple-500 to-purple-700",
      route: "/segments",
    },
    {
      id: 2,
      label: "Active Campaigns",
      value: 5,
      icon: <Megaphone className="w-6 h-6 text-white" />,
      bg: "from-blue-500 to-blue-700",
      route: "/campaign-history",
    },
    {
      id: 3,
      label: "Users Registered",
      value: 320,
      icon: <Users className="w-6 h-6 text-white" />,
      bg: "from-green-500 to-green-700",
      route: "/users",
    },
    {
      id: 4,
      label: "Pending Approvals",
      value: 3,
      icon: <Clock className="w-6 h-6 text-white" />,
      bg: "from-yellow-500 to-yellow-700",
      route: "/approvals",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        🚀 Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            onClick={() => navigate(stat.route)}
            className={`cursor-pointer rounded-xl p-5 text-white shadow-md bg-gradient-to-br ${stat.bg} hover:scale-[1.03] transition-transform duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                {stat.icon}
              </div>
              <span className="text-4xl font-bold">{stat.value}</span>
            </div>
            <p className="text-lg font-medium tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
