import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import './index.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    age: "",
    address: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      if (decoded.email_verified) {
        const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
        const user = {
          name: decoded.name || existingUser.name || "",
          email: decoded.email,
          picture: decoded.picture || "",
          age: existingUser.age || "",
          gender: existingUser.gender || "",
          address: existingUser.address || "",
        };
        login(credentialResponse.credential, user);
        if (!user.name || !user.age || !user.gender || !user.address) {
          navigate("/edit-profile");
        } else {
          navigate("/");
        }
      } else {
        alert("Please verify your email before logging in.");
      }
    } catch (error) {
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
    if (mode === "login") {
      const savedUser = JSON.parse(localStorage.getItem("manualUser") || "{}");
      if (
        savedUser?.email === form.email &&
        savedUser?.password === form.password
      ) {
        login("manual-token", savedUser);
        navigate("/");
      } else {
        alert("Invalid credentials. Try again or use Google login.");
      }
    } else {
      if (form.password !== form.confirmPassword) {
        return alert("Passwords do not match!");
      }
      const newUser = {
        name: form.name,
        age: form.age,
        dob: form.dob,
        address: form.address,
        email: form.email,
        password: form.password,
        gender: "",
      };
      localStorage.setItem("manualUser", JSON.stringify(newUser));
      alert("Account created. You can now log in.");
      setMode("login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navbar with Xeno logo */}
      <nav className="w-full flex items-center justify-center py-6 bg-gray-900">
        <img src="/logo.png" alt="Xeno Logo" className="h-16 w-auto" />
      </nav>
      {/* Login form */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <p className="text-gray-300 mb-6 text-center">
            {mode === "login" ? "Login to your account" : "Create a new account"}
          </p>
          <form onSubmit={handleManualSubmit} className="space-y-4 text-left">
            {mode !== "login" && (
              <>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
                />
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
                />
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
                />
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Address"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
                />
              </>
            )}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-sm text-blue-400 cursor-pointer select-none"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {mode !== "login" && (
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-2.5 text-sm text-blue-400 cursor-pointer select-none"
                >
                  {showConfirm ? "Hide" : "Show"}
                </span>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              {mode === "login" ? "Login" : "Register"}
            </button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative text-sm text-gray-500 bg-gray-800 px-4 text-center">or</div>
          </div>
          <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} width="100%" theme="filled_blue" size="large" shape="rect" text="signin_with" />
          <div className="text-center mt-6 text-gray-300">
            {mode === "login" ? "New here?" : "Already have an account?"} {" "}
            <span
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              {mode === "login" ? "Create an account" : "Login"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
