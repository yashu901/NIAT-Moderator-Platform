import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("auth/login/", { username, password });
      localStorage.setItem("token", res.data.access);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
      <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}