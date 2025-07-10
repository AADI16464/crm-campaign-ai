import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // ✅ import the auth hook

const EditProfile = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login method from context

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [profile, setProfile] = useState({
    name: storedUser.name || "",
    age: storedUser.age || "",
    dob: storedUser.dob || "",
    gender: storedUser.gender || "",
    address: storedUser.address || "",
    email: storedUser.email || "", // read-only
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(profile));
    login(); // ✅ update auth context in case it's needed
    alert("Profile updated successfully!");
    navigate("/"); // ✅ Redirect to dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gray-50">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">✏️ Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md shadow focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md shadow focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md shadow focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md shadow focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              rows={3}
              className="w-full border px-4 py-2 rounded-md shadow focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="w-full bg-gray-100 cursor-not-allowed px-4 py-2 border rounded-md shadow"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
