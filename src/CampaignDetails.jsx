import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/campaigns/${id}`
        );
        setCampaign(res.data);
      } catch (error) {
        alert("Failed to load campaign details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAISummary = async () => {
      try {
        const res = await axios.post(`http://localhost:8080/api/ai/summary`, {
          campaignId: id,
        });
        setSummary(res.data.summary);
      } catch (error) {
        setSummary("Summary not available.");
      }
    };

    fetchCampaignDetails();
    fetchAISummary();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-lg text-gray-500 mt-10">Loading...</p>
    );
  if (!campaign)
    return (
      <p className="text-center text-lg text-gray-500 mt-10">
        Campaign not found.
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Campaign Details
      </h2>

      <div className="bg-gray-100 p-5 rounded-lg mb-6 space-y-3">
        <p>
          <span className="font-semibold">Segment:</span>{" "}
          {campaign.segmentName}
        </p>
        <p>
          <span className="font-semibold">Message:</span> {campaign.message}
        </p>
        <p>
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(campaign.createdAt).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Audience Size:</span>{" "}
          {campaign.audienceSize}
        </p>
        <p>
          <span className="font-semibold">Sent:</span> {campaign.sentCount}
        </p>
        <p>
          <span className="font-semibold">Failed:</span> {campaign.failedCount}
        </p>
      </div>

      <div className="bg-blue-50 p-4 border-l-4 border-blue-600 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">📊 Campaign Summary (AI)</h3>
        <p className="text-gray-700">{summary}</p>
      </div>
    </div>
  );
};

export default CampaignDetails;
