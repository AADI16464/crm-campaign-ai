import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: "c1",
      name: "Spring Sale",
      segment: "Inactive Users",
      sentDate: "2025-05-15",
      status: "Sent",
    },
    {
      id: "c2",
      name: "Welcome Campaign",
      segment: "New Users",
      sentDate: "2025-05-20",
      status: "Scheduled",
    },
    {
      id: "c3",
      name: "Holiday Discount",
      segment: "All Users",
      sentDate: "2025-06-01",
      status: "Draft",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/campaigns");
        setCampaigns(res.data || []);
      } catch (error) {
        alert("Failed to load campaign history.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/campaign/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Campaign History
      </h2>

      {loading ? (
        <p className="text-lg text-center text-gray-500">Loading...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-lg text-center text-gray-500">No campaigns found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 border">Campaign ID</th>
                <th className="px-4 py-2 border">Segment Name</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Sent</th>
                <th className="px-4 py-2 border">Failed</th>
                <th className="px-4 py-2 border">Audience Size</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {campaigns
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="even:bg-gray-50 odd:bg-white"
                  >
                    <td className="px-4 py-2 border text-center">
                      {campaign.id}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {campaign.segmentName}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {campaign.message}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {campaign.sentCount}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {campaign.failedCount}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {campaign.audienceSize}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {new Date(campaign.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => handleViewDetails(campaign.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                      >
                        View
                      </button>
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

export default CampaignHistory;
