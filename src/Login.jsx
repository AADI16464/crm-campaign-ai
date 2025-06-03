import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      if (decoded.email_verified) {
        localStorage.setItem("token", credentialResponse.credential);
        localStorage.setItem("user", JSON.stringify(decoded));
        navigate("/edit-profile"); // Allow info update after Google login
      } else {
        alert("Please verify your email before logging in.");
      }
    } catch (error) {
      console.error("JWT decode failed", error);
      alert("Login failed during decoding");
    }
  };

  const handleLoginError = () => {
    alert("Google Login Failed. Please try again.");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    // Simulated backend check
    if (mode === "login") {
      const savedUser = JSON.parse(localStorage.getItem("manualUser"));
      if (
        savedUser &&
        savedUser.email === form.email &&
        savedUser.password === form.password
      ) {
        localStorage.setItem("user", JSON.stringify(savedUser));
        navigate("/");
      } else {
        alert("Invalid credentials. Try again or use Google login.");
      }
    } else {
      // Register
      localStorage.setItem("manualUser", JSON.stringify(form));
      alert("Account created. You can now log in.");
      setMode("login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-sm text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          🚀 Xeno CRM
        </h1>
        <p className="text-gray-600 mb-6">
          {mode === "login" ? "Login to your account" : "Create a new account"}
        </p>

        <form onSubmit={handleManualSubmit} className="mb-6 space-y-4 text-left">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative text-sm text-gray-500 bg-white px-4">
            or
          </div>
        </div>

        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />

        <p className="mt-6 text-sm text-gray-500">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <span
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            {mode === "login" ? "Create an account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
