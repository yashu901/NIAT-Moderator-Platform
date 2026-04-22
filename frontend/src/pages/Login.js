import React, { useState } from "react";
import API from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("auth/login/", { username, password });
      localStorage.setItem("token", res.data.access);
      const payload = JSON.parse(atob(res.data.access.split('.')[1]));
      localStorage.setItem("role", payload.role);
      window.location.href = "/dashboard";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">

      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 border border-white/30">

        <h2 className="text-2xl font-semibold text-center text-white mb-4">
          Moderator Dashboard
        </h2>


        <p className="text-center text-gray-200 text-sm mb-6">
          Authorized users only. Sign in to continue.
        </p>


        <input
          className="w-full p-3 rounded-lg mb-4 bg-white/30 text-white placeholder-gray-200 focus:outline-none"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 rounded-lg mb-4 bg-white/30 text-white placeholder-gray-200 focus:outline-none"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-white text-blue-600 font-semibold p-3 rounded-lg hover:scale-105 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;