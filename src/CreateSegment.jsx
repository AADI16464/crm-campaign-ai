import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateSegment = () => {
  const navigate = useNavigate();
  const [segmentName, setSegmentName] = useState("");
  const [rules, setRules] = useState([{ field: "", operator: "", value: "" }]);
  const [logic, setLogic] = useState("AND");
  const [audienceSize, setAudienceSize] = useState(null);
  const resultRef = useRef(null);

  const handleRuleChange = (index, key, value) => {
    const updated = [...rules];
    updated[index][key] = value;
    setRules(updated);
  };

  const addRule = () => {
    setRules([...rules, { field: "", operator: "", value: "" }]);
  };

  const previewAudience = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/segments/preview", {
        rules,
        logic,
      });
      setAudienceSize(res.data.size);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      alert("Failed to preview audience.");
    }
  };

  const saveSegment = async () => {
    try {
      await axios.post("http://localhost:8080/api/segments", {
        name: segmentName,
        rules,
        logic,
      });
      navigate("/campaign-form");
    } catch (error) {
      alert("Failed to save segment.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          🎯 Create Audience Segment
        </h2>

        <input
          type="text"
          placeholder="Segment Name"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="space-y-4 mb-6">
          {rules.map((rule, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-3">
              <select
                value={rule.field}
                onChange={(e) => handleRuleChange(index, "field", e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Field</option>
                <option value="spend">Total Spend</option>
                <option value="visits">Visits</option>
                <option value="inactiveDays">Inactive Days</option>
              </select>

              <select
                value={rule.operator}
                onChange={(e) => handleRuleChange(index, "operator", e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Operator</option>
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
                <option value="=">=</option>
              </select>

              <input
                type="text"
                placeholder="Value"
                value={rule.value}
                onChange={(e) => handleRuleChange(index, "value", e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <button
          onClick={addRule}
          className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold mb-6 hover:bg-gray-800 transition"
        >
          ➕ Add Rule
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <label className="text-gray-700 font-medium">Combine rules with:</label>
          <select
            value={logic}
            onChange={(e) => setLogic(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <button
            onClick={previewAudience}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            🔍 Preview Audience Size
          </button>

          <button
            onClick={saveSegment}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            💾 Save Segment & Continue
          </button>
        </div>

        {audienceSize !== null && (
          <div
            ref={resultRef}
            className="mt-4 text-green-600 font-semibold text-center text-lg"
          >
            ✅ Matching users: {audienceSize}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateSegment;
