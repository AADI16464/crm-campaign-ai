import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CampaignForm = () => {
  const [segments, setSegments] = useState([]);
  const [selectedSegmentId, setSelectedSegmentId] = useState("");
  const [message, setMessage] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/segments");
        setSegments(res.data || []);
      } catch {
        alert("Failed to load segments.");
      }
    };

    fetchSegments();
  }, []);

  const handleAISuggestions = async () => {
    setAiLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/ai/messages", {
        objective: "bring back inactive users",
      });
      setAiSuggestions(res.data.suggestions || []);
    } catch {
      alert("Failed to fetch AI suggestions.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedSegmentId || !message) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/campaigns", {
        segmentId: selectedSegmentId,
        message,
      });
      navigate("/campaign-history");
    } catch {
      alert("Campaign submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          📢 Launch a New Campaign
        </h2>

        {/* Segment Selection */}
        <div className="mb-6">
          <label htmlFor="segment" className="block font-medium text-gray-700 mb-2">
            🎯 Target Segment
          </label>
          <select
            id="segment"
            value={selectedSegmentId}
            onChange={(e) => setSelectedSegmentId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a Segment --</option>
            {segments.map((segment) => (
              <option key={segment.id} value={segment.id}>
                {segment.name}
              </option>
            ))}
          </select>
        </div>

        {/* Message Box */}
        <div className="mb-6">
          <label htmlFor="message" className="block font-medium text-gray-700 mb-2">
            💬 Campaign Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="E.g. Hi Mohit, here's 10% off on your next order!"
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* AI Suggestion Button */}
        <button
          type="button"
          onClick={handleAISuggestions}
          disabled={aiLoading}
          className={`w-full py-3 text-white rounded-lg font-semibold transition ${
            aiLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-700 hover:bg-gray-800"
          }`}
        >
          {aiLoading ? "✨ Generating Suggestions..." : "🔮 Suggest with AI"}
        </button>

        {/* AI Suggestions */}
        {aiSuggestions.length > 0 && (
          <div className="bg-gray-100 mt-5 p-4 rounded-lg shadow-inner">
            <p className="font-semibold mb-3 text-gray-700">💡 Suggestions (click to use):</p>
            <ul className="space-y-2">
              {aiSuggestions.map((suggestion, i) => (
                <li
                  key={i}
                  onClick={() => setMessage(suggestion)}
                  className="p-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-blue-100 transition"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-lg font-semibold text-white ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          {loading ? "📤 Sending..." : "🚀 Send Campaign"}
        </button>
      </div>
    </div>
  );
};

export default CampaignForm;
