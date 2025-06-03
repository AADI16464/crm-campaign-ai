import React, { useEffect, useState } from "react";
import axios from "axios";

const SegmentPreview = () => {
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rules = JSON.parse(localStorage.getItem("segmentRules"));
    const logic = localStorage.getItem("segmentLogic");

    const fetchPreview = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/segments/preview",
          { rules, logic }
        );
        setPreviewData(response.data.users || []);
      } catch (error) {
        alert("Failed to fetch preview data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-xl mt-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 tracking-tight">
        👥 Segment Audience Preview
      </h2>

      {loading ? (
        <p className="text-lg text-center text-gray-500 font-medium">
          Loading preview...
        </p>
      ) : previewData.length === 0 ? (
        <p className="text-lg text-center text-gray-500 font-medium">
          No matching users found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-md font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-md font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-md font-semibold uppercase tracking-wider">
                  Total Spend
                </th>
                <th className="px-6 py-4 text-left text-md font-semibold uppercase tracking-wider">
                  Visits
                </th>
                <th className="px-6 py-4 text-left text-md font-semibold uppercase tracking-wider">
                  Last Active
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              {previewData.map((user, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-50 even:bg-white hover:bg-blue-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{user.totalSpend}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.visits}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SegmentPreview;
