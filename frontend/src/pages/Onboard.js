import React, { useState } from "react";
import API from "../services/api";
import { useSearchParams } from "react-router-dom";

function Onboard() {
  const [password, setPassword] = useState("");

  // ✅ get token from URL
  const [params] = useSearchParams();
  const token = params.get("token");

  const handleSubmit = async () => {
    try {
      await API.post("auth/onboard/", { token, password });

      alert("Account created successfully");

      // ✅ redirect to login
      window.location.href = "/";

    } catch (error) {
      alert("Error onboarding user");
      console.log(error.response);
    }
  };

  return (
    <div>
      <h2>Set Password</h2>

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Onboard;